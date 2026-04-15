import { redirect } from "next/navigation";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import { FormHeaderAndTopText } from "@/features/kartleggingssporsmal/form/FormHeaderAndTopText";
import KartleggingssporsmalFormPage from "@/features/kartleggingssporsmal/form/KartleggingssporsmalFormPage";
import KartleggingssporsmalFormSummaryPage from "@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummaryPage";
import NoAccessInformation from "@/features/no-access/NoAccess";
import {
  type FormVariant,
  formVariantSchema,
} from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import { fetchKandidatStatus } from "@/services/meroppfolging/meroppfolgingService";

const DEFAULT_DEMO_SKJEMAVARIANT: FormVariant = "FLERVALG_V1";

type NextSearchParamsPromise = Promise<
  Record<string, string | string[] | undefined>
>;

interface Props {
  searchParams: NextSearchParamsPromise;
}

export default async function Home({ searchParams }: Props) {
  const {
    formResponse,
    isKandidat,
    skjemavariant: formVariantFromBackend,
  } = await fetchKandidatStatus();

  let effectiveFormVariant = formVariantFromBackend;

  if (isLocalOrDemo) {
    effectiveFormVariant =
      await getDemoFormVariantFromUrlParamOrRedirectToDefault(searchParams);
  }

  if (!isKandidat) {
    return <NoAccessInformation />;
  }

  if (formResponse) {
    return (
      <KartleggingssporsmalFormSummaryPage
        formResponse={formResponse}
        formVariant={skjemavariant}
      />
    );
  }

  return (
    <KartleggingssporsmalFormPage
      key={effectiveFormVariant}
      formVariant={effectiveFormVariant}
      topContent={<FormHeaderAndTopText />}
    />
  );

  /**
   * Used in demo environment to read demoFormVariant parameter from url. That
   * parameter is used to determine which form variant to show in demo. The
   * value of the parameter can be changed by the user via the DemoInfoCard UI.
   * If the parameter is not set or has an invalid value, as is the case when
   * a user first visits the demo, they are redirected to the same page with the
   * default demo form variant set in the parameter.
   */
  async function getDemoFormVariantFromUrlParamOrRedirectToDefault(
    searchParams: NextSearchParamsPromise,
  ) {
    const demoFormVariantParam = (await searchParams)[
      DEMO_SKJEMAVARIANT_URL_PARAM_KEY
    ];

    const parsedDemoVariant = formVariantSchema.safeParse(demoFormVariantParam);

    if (!parsedDemoVariant.success) {
      const params = new URLSearchParams();
      params.set(DEMO_SKJEMAVARIANT_URL_PARAM_KEY, DEFAULT_DEMO_SKJEMAVARIANT);

      redirect(`/?${params.toString()}`);
    } else {
      return parsedDemoVariant.data;
    }
  }
}

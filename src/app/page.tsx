import { redirect } from "next/navigation";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import { FormHeaderAndTopText } from "@/features/kartleggingssporsmal/form/FormHeaderAndTopText";
import KartleggingssporsmalFormPage from "@/features/kartleggingssporsmal/form/KartleggingssporsmalFormPage";
import KartleggingssporsmalFormSummaryPage from "@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummaryPage";
import NoAccessInformation from "@/features/no-access/NoAccess";
import { formVariants } from "@/forms/kartleggingssporsmal/formVariants/formVariants";
import { formVariantSchema } from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";
import { fetchKandidatStatus } from "@/services/meroppfolging/meroppfolgingService";

const defaultDemoSkjemavariant = formVariants[0];

interface Props {
  searchParams: Promise<{
    [DEMO_SKJEMAVARIANT_URL_PARAM_KEY]?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const {
    formResponse,
    isKandidat,
    skjemavariant: skjemavariantFromBackend,
  } = await fetchKandidatStatus();

  let effectiveSkjemavariant = skjemavariantFromBackend;

  if (isLocalOrDemo) {
    const demoSkjemavariantParam = (await searchParams)[
      DEMO_SKJEMAVARIANT_URL_PARAM_KEY
    ];

    effectiveSkjemavariant = getDemoSkjemavariantParamOrRedirectToDefault(
      demoSkjemavariantParam,
    );
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
      key={effectiveSkjemavariant}
      formVariant={effectiveSkjemavariant}
      topContent={<FormHeaderAndTopText />}
    />
  );

  function getDemoSkjemavariantParamOrRedirectToDefault(
    demoSkjemavariantParam?: string,
  ) {
    const parsedDemoVariant = formVariantSchema.safeParse(
      demoSkjemavariantParam,
    );

    if (!parsedDemoVariant.success) {
      const params = new URLSearchParams();
      params.set(DEMO_SKJEMAVARIANT_URL_PARAM_KEY, defaultDemoSkjemavariant);

      redirect(`/?${params.toString()}`);
    } else {
      return parsedDemoVariant.data;
    }
  }
}

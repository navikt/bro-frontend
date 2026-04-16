import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import {
  type FormVariant,
  formVariantSchema,
} from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

export const DEFAULT_DEMO_FORM_VARIANT: FormVariant = "FLERVALG_V1";

/**
 * This hook handles the logic for determining which form variant to display in
 * demo environments, based on a URL parameter. It also provides a function to
 * update this URL parameter, so different form variants can be tested.
 * Using the hook in a demo environment when the URL parameter is not set or
 * invalid will cause the URL to be updated with the default demo variant.
 */
export function useDemoFormVariantViaParamIfDemo(
  formVariantIfNotInDemo: FormVariant,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  let activeFormVariant = formVariantIfNotInDemo;

  const demoVariantFromUrl = searchParams.get(DEMO_SKJEMAVARIANT_URL_PARAM_KEY);
  const parseVariantResult = formVariantSchema.safeParse(demoVariantFromUrl);

  // Override form variant with the one from URL parameter if we're in a demo
  // environment
  if (parseVariantResult.success && isLocalOrDemo) {
    activeFormVariant = parseVariantResult.data;
  }

  const changeDemoFormVariantViaParam = useCallback(
    (variant: FormVariant, options?: { replaceUrl?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(DEMO_SKJEMAVARIANT_URL_PARAM_KEY, variant);

      if (options?.replaceUrl) {
        router.replace(`${pathname}?${params.toString()}`);
      } else {
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [router, pathname, searchParams],
  );

  // Side effect: update URL if we're in a demo environment and URL parameter is
  // missing or is invalid.
  useEffect(() => {
    if (!parseVariantResult.success && isLocalOrDemo) {
      changeDemoFormVariantViaParam(DEFAULT_DEMO_FORM_VARIANT, {
        replaceUrl: true,
      });
    }
  }, [parseVariantResult.success, changeDemoFormVariantViaParam]);

  return {
    activeFormVariant,
    changeDemoFormVariantViaParam,
  };
}

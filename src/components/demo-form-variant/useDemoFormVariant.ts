import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { DEMO_SKJEMAVARIANT_URL_PARAM_KEY } from "@/appConfig";
import { isLocalOrDemo } from "@/env-variables/envHelpers";
import {
  type FormVariant,
  formVariantSchema,
} from "@/forms/kartleggingssporsmal/formVariants/types/FormVariant";

// Set IS_DEMO_VARIANT_URL_PARAM_ENABLED to `isDemo` to test locally with mock
// backend variant value instead of variant from URL parameter.
export const IS_DEMO_VARIANT_URL_PARAM_ENABLED = isLocalOrDemo;
export const DEFAULT_DEMO_FORM_VARIANT: FormVariant = "FLERVALG_V1";

/**
 * This hook handles the logic for determining which form variant to display in
 * demo environments, based on a URL parameter. It also provides a function to
 * update this URL parameter, so different form variants can be tested.
 */
export function useDemoFormVariantUrlParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let demoFormVariant = DEFAULT_DEMO_FORM_VARIANT;

  const demoVariantFromUrl = searchParams.get(DEMO_SKJEMAVARIANT_URL_PARAM_KEY);
  const parseVariantUrlParamResult =
    formVariantSchema.safeParse(demoVariantFromUrl);

  const isValidVariantUrlParam = parseVariantUrlParamResult.success;

  // Read demo variant from URL parameter
  if (isValidVariantUrlParam) {
    demoFormVariant = parseVariantUrlParamResult.data;
  }

  const changeDemoVariantViaUrlParam = useCallback(
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

  return {
    demoFormVariant,
    isValidVariantUrlParam,
    changeDemoVariantViaUrlParam,
  };
}

/**
 * Using this hook in a demo environment when the URL parameter is not set or
 * invalid will cause the URL to be updated with the default demo variant.
 */
export const useEnsureVariantUrlParamIfDemoEffect = () => {
  const { isValidVariantUrlParam, changeDemoVariantViaUrlParam } =
    useDemoFormVariantUrlParam();

  useEffect(() => {
    if (!isValidVariantUrlParam && IS_DEMO_VARIANT_URL_PARAM_ENABLED) {
      changeDemoVariantViaUrlParam(DEFAULT_DEMO_FORM_VARIANT, {
        replaceUrl: true,
      });
    }
  }, [isValidVariantUrlParam, changeDemoVariantViaUrlParam]);
};

import type { KartleggingssporsmalForm } from "@/forms/kartleggingssporsmalForm";

type KartleggingssporsmalFormAlsoUnfilled = {
  [K in keyof KartleggingssporsmalForm]: KartleggingssporsmalForm[K] | "";
};

export const formDefaultValues: KartleggingssporsmalFormAlsoUnfilled = {
  hvorSannsynligTilbakeTilJobben: "",
  hvorSannsynligTilbakeTilJobbenBegrunnelse: "",
  samarbeidOgRelasjonTilArbeidsgiver: "",
  naarTilbakeTilJobben: "",
};

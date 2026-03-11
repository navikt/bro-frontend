import type { KartleggingssporsmalForm } from "@/forms/kartleggingssporsmal/formSchema";

type KartleggingssporsmalFormAlsoUnfilled = {
  [K in keyof KartleggingssporsmalForm]: KartleggingssporsmalForm[K] | "";
};

export const formDefaultValues: KartleggingssporsmalFormAlsoUnfilled = {
  hvorSannsynligTilbakeTilJobben: "",
  hvorSannsynligTilbakeTilJobbenBegrunnelse: "",
  samarbeidOgRelasjonTilArbeidsgiver: "",
  naarTilbakeTilJobben: "",
};

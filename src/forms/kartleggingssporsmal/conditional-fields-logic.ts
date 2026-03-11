import type { KartleggingssporsmalForm } from "./formSchema";

export function shouldIncludeTilbakeTilJobbBegrunnelseField(
  hvorSannsynligTilbakeTilJobben:
    | KartleggingssporsmalForm["hvorSannsynligTilbakeTilJobben"]
    | "",
): boolean {
  return (
    hvorSannsynligTilbakeTilJobben === "1b" ||
    hvorSannsynligTilbakeTilJobben === "1c"
  );
}

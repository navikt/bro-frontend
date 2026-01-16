import { FormHeaderAndTopText } from "@/features/kartleggingssporsmal/form/FormHeaderAndTopText";
import KartleggingssporsmalFormPage from "@/features/kartleggingssporsmal/form/KartleggingssporsmalFormPage";
import KartleggingssporsmalFormSummaryPage from "@/features/kartleggingssporsmal/summary/KartleggingssporsmalFormSummaryPage";
import NoAccessInformation from "@/features/no-access/NoAccess";
import { fetchKandidatStatus } from "@/services/meroppfolging/meroppfolgingService";

export default async function Home() {
  const { formResponse, isKandidat } = await fetchKandidatStatus();

  if (!isKandidat) {
    return <NoAccessInformation />;
  }

  if (formResponse) {
    return <KartleggingssporsmalFormSummaryPage formResponse={formResponse} />;
  }

  return <KartleggingssporsmalFormPage topContent={<FormHeaderAndTopText />} />;
}

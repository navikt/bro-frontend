import { fetchKandidatStatus } from '@/services/meroppfolging/meroppfolgingService'
import KartleggingssporsmalLanding from '@/features/kartleggingssporsmal/KartleggingssporsmalLanding'

export default async function Home() {
  const kandidatStatus = await fetchKandidatStatus()

  return <KartleggingssporsmalLanding kandidatStatus={kandidatStatus} />
}

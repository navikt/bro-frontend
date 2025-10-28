import { fetchKandidatStatus } from '@/services/meroppfolging/meroppfolgingService'
import KartleggingssporsmalLanding from '@/features/kartleggingssporsmal/KartleggingssporsmalLanding'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const kandidatStatus = await fetchKandidatStatus()

  return <KartleggingssporsmalLanding kandidatStatus={kandidatStatus} />
}

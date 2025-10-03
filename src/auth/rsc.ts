import { logger } from '@navikt/next-logger'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getToken, validateToken } from '@navikt/oasis'
import { isLocalOrDemo } from '@/constants/envs'

export async function verifyUserLoggedIn(): Promise<string> {
  if (isLocalOrDemo) {
    logger.warn('Is running locally, skipping RSC auth')
    return 'fake-local-token'
  }

  const requestHeaders = await headers()
  const token = getToken(requestHeaders)

  if (!token) {
    logger.info('Found no token, redirecting to login')
    redirect(`/oauth2/login`)
  }

  const validationResult = await validateToken(token)
  if (!validationResult.ok) {
    redirect(`/oauth2/login}`)
  }

  return token
}

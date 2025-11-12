import useUxSignalsScript from '@/hooks/uxSignals'
import { isLocalOrDemo } from '@/env-variables/envHelpers'

export default function UxSignalsPanel() {
  useUxSignalsScript(true)

  return <div data-uxsignals-embed="panel-emwigf91dw" data-uxsignals-mode={isLocalOrDemo ? 'demo' : ''} />
}

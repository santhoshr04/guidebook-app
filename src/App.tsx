import { useState } from 'react'
import { OfflineBanner } from './components/OfflineBanner'
import { useOnline } from './hooks/useOnline'
import { InTripApp } from './phases/InTripApp'
import { PostTripApp } from './phases/PostTripApp'
import { PreTripApp } from './phases/PreTripApp'
import { StatePicker } from './phases/StatePicker'
import type { Phase } from './types'

function App() {
  const [phase, setPhase] = useState<Phase>('entry')
  const online = useOnline()

  return (
    <>
      {!online ? <OfflineBanner /> : null}
      {phase === 'entry' ? <StatePicker onSelect={setPhase} /> : null}
      {phase === 'pre_trip' ? <PreTripApp onExit={() => setPhase('entry')} /> : null}
      {phase === 'on_trip' ? <InTripApp onExit={() => setPhase('entry')} /> : null}
      {phase === 'post_trip' ? <PostTripApp onExit={() => setPhase('entry')} /> : null}
    </>
  )
}

export default App

import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ParticleSystem from './components/ParticleSystem'
import ControlPanel from './components/ControlPanel'
import StatsOverlay from './components/StatsOverlay'
import { useSimStore } from './store/simulation'

export default function App() {
  const setParam = useSimStore(s => s.setParam)
  const stepForward = useSimStore(s => s.stepForward)
  const paused = useSimStore(s => s.paused)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return

      if (e.code === 'Space') {
        e.preventDefault()
        setParam('paused', !paused)
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        if (paused) {
          stepForward()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setParam, stepForward, paused])

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
          <color attach="background" args={['#050510']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={80} depth={50} count={1000} factor={3} />
          <ParticleSystem />
          <OrbitControls makeDefault enableDamping />
        </Canvas>
        <StatsOverlay />
      </div>
      <ControlPanel />
    </div>
  )
}

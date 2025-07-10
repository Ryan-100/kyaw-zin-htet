import React, { useRef, useState } from 'react'
import { Rocket } from '@/components/ui/rocket'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

interface AnimatedRocketProps {
  isAnimating: boolean;
  onComplete: () => void;
  scrollHeight: number;
  viewportHeight: number;
}

const AnimatedRocket: React.FC<AnimatedRocketProps> = ({ 
  isAnimating, 
  onComplete, 
  scrollHeight, 
  viewportHeight 
}) => {
  const rocketRef = useRef<THREE.Group>(null)
  const { camera, size } = useThree()
  const animationRef = useRef<gsap.core.Timeline | undefined>(undefined)
  
  React.useEffect(() => {
    if (!isAnimating || !rocketRef.current) return

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    // FIXED trajectory dimensions - no longer dependent on scroll height
    const trajectoryHeight = 40 // Fixed height for consistent appearance
    const trajectoryWidth = 25 // Fixed width for consistent appearance
    
    // Starting position (bottom of viewport)
    const startY = -trajectoryHeight / 2

    // Reset rocket to bottom position with CONSISTENT SIZE
    rocketRef.current.position.set(0, startY, 0)
    rocketRef.current.rotation.set(0, 0, 0)
    rocketRef.current.scale.set(1.5, 1.5, 1.5) // Fixed consistent size

    // GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        animationRef.current = undefined
        
        // Smooth transition back to static position without falling effect
        // First fade out the rocket
        gsap.to(rocketRef.current!.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            // Reset position instantly while invisible
            if (rocketRef.current) {
              rocketRef.current.position.set(0, startY, 0)
              rocketRef.current.rotation.set(0, 0, 0)
              
              // Fade back in with proper scale
              gsap.to(rocketRef.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                onComplete: () => {
                  onComplete()
                }
              })
            }
          }
        })
        
        // Reset camera smoothly
        gsap.to(camera.position, {
          z: 15,
          duration: 0.8,
          ease: "power2.inOut"
        })
      }
    })

    // FIXED camera distance - no longer dependent on trajectory height
    const cameraDistance = 50 // Fixed camera distance for consistent rocket appearance
    tl.to(camera.position, {
      z: cameraDistance,
      duration: 1.2,
      ease: "power2.out"
    }, 0)

    // Fixed duration - no longer dependent on scroll ratio
    const duration = 5 // Fixed duration for consistent animation speed
    const steps = 100

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps
      
      let x, y, z
      
      if (progress <= 0.33) {
        // First curve - bottom left to middle right
        const t = progress / 0.33
        const curveProgress = t * Math.PI
        x = Math.sin(curveProgress * 2) * trajectoryWidth * 0.4 - trajectoryWidth * 0.5 + (t * trajectoryWidth)
        y = startY + (t * trajectoryHeight * 0.6) + Math.sin(curveProgress * 3) * (trajectoryHeight * 0.05)
        z = Math.cos(curveProgress * 2) * 3
      } else if (progress <= 0.66) {
        // Second curve - middle right to top left  
        const t = (progress - 0.33) / 0.33
        const curveProgress = t * Math.PI
        x = trajectoryWidth * 0.5 - (t * trajectoryWidth) + Math.sin(curveProgress * 2) * trajectoryWidth * 0.4
        y = startY + trajectoryHeight * 0.6 + (t * trajectoryHeight * 0.3) + Math.sin(curveProgress * 3) * (trajectoryHeight * 0.05)
        z = Math.cos(curveProgress * 2) * 3
      } else {
        // Final curve - top left to top center (scroll to top position)
        const t = (progress - 0.66) / 0.34
        const curveProgress = t * Math.PI
        x = -trajectoryWidth * 0.5 + (t * trajectoryWidth * 0.5) + Math.sin(curveProgress * 2) * trajectoryWidth * 0.2
        y = startY + trajectoryHeight * 0.9 + (t * trajectoryHeight * 0.1) + Math.sin(curveProgress * 2) * (trajectoryHeight * 0.02)
        z = Math.cos(curveProgress * 1.5) * 2
      }

      tl.to(rocketRef.current.position, {
        x, y, z,
        duration: duration / steps,
        ease: "none"
      }, progress * duration)

      // Rocket rotation based on movement direction
      const rotationY = Math.sin(progress * Math.PI * 4) * 0.3
      const rotationZ = Math.sin(progress * Math.PI * 6) * 0.2
      
      tl.to(rocketRef.current.rotation, {
        y: rotationY,
        z: rotationZ,
        x: Math.sin(progress * Math.PI * 8) * 0.1,
        duration: duration / steps,
        ease: "none"
      }, progress * duration)

      // CONSISTENT scale animation - fixed size regardless of page dimensions
      const scale = 2 // Fixed consistent scale
      tl.to(rocketRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: duration / steps,
        ease: "none"
      }, progress * duration)
    }

    // Add a final "arrival" effect at the top with consistent size
    tl.to(rocketRef.current.scale, {
      x: 2, // Slightly larger than flight scale for arrival effect
      y: 2,
      z: 2,
      duration: 0.3,
      ease: "back.out(1.7)"
    }, duration)

    // Small celebration rotation at the top
    tl.to(rocketRef.current.rotation, {
      y: "+=6.28", // Full rotation
      duration: 0.8,
      ease: "power2.out"
    }, duration + 0.2)

    animationRef.current = tl

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = undefined
      }
    }
  }, [isAnimating, onComplete, camera, size, scrollHeight, viewportHeight])

  return (
    <group ref={rocketRef}>
      <Rocket position={[0, 0, 0]} scale={[2, 2, 2]} />
    </group>
  )
}

const RocketScrollButton = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const trajectoryContainerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (isAnimating) return
    
    // Calculate actual scroll metrics
    const scrollHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight
    const currentScroll = window.scrollY
    const maxScroll = scrollHeight - viewportHeight
        
    // Only animate if there's significant scroll distance
    if (maxScroll < 100) {
      console.log('Not enough scroll distance for animation')
      return
    }
    
    setIsAnimating(true)

    // Calculate animation duration - 1.2x FASTER but still responsive to content
    const scrollRatio = maxScroll / viewportHeight
    const baseScrollDuration = Math.max(3, Math.min(6, scrollRatio * 1.5)) // Shorter base duration
    const scrollDuration = baseScrollDuration / 1.2 // Make it 1.2x faster
    
    // Scroll animation - synchronized with rocket trajectory
    const scrollTl = gsap.timeline({
      onComplete: () => {
        window.scrollTo(0, 0)
      }
    })
    
    scrollTl.to({}, {
      duration: scrollDuration,
      onUpdate: () => {
        const progress = scrollTl.progress()
        const newY = currentScroll * (1 - progress)
        window.scrollTo(0, newY)
      },
      ease: 'power2.inOut' // Changed to inOut for smoother scroll completion
    })
  }

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setIsAnimating(false)
    }, 100)
  }

  // Calculate current scroll metrics for the rocket animation
  const scrollHeight = typeof window !== 'undefined' ? document.documentElement.scrollHeight : 1000
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  
  return (
    <>
      {/* Small button container - stays fixed size */}
      <div 
        ref={buttonContainerRef}
        className={`fixed bottom-4 right-0 z-[99999999] cursor-pointer transition-all duration-500 transform`}
        style={{
          width: 160,
          height: 160,
          display: isAnimating ? 'none' : 'block'
        }}
        onClick={handleClick}
      >
        <Canvas 
          style={{
            width: '160px',
            height: '160px',
            background: 'transparent'
          }}
          camera={{ position: [0, 0, 15], fov: 60 }}
        >
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={7} />
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={0.6} />
          <directionalLight position={[10, -10, 10]} intensity={0.8} />
          <pointLight position={[0, 15, 5]} intensity={0.8} color="#4F46E5" />
          <pointLight position={[0, -15, -5]} intensity={0.6} color="#EC4899" />
          
          <group>
            <Rocket position={[0, -4.5, 0]} scale={[3, 3, 3]} />
          </group>
        </Canvas>
      </div>

      {/* Full viewport trajectory container - always rendered but visibility controlled */}
      <div 
        ref={trajectoryContainerRef}
        className="fixed inset-0 z-[99999999] overflow-hidden"
        style={{
          width: '100%',
          height: '100vh',
          visibility: isAnimating ? 'visible' : 'hidden',
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out'
        }}
      >
        <Canvas 
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
          camera={{ position: [0, 0, 15], fov: 60 }}
        >
          {/* Enhanced lighting setup */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={0.6} />
          <directionalLight position={[10, -10, 10]} intensity={0.8} />
          <pointLight position={[0, 15, 5]} intensity={0.8} color="#4F46E5" />
          <pointLight position={[0, -15, -5]} intensity={0.6} color="#EC4899" />
          
          <AnimatedRocket 
            isAnimating={isAnimating} 
            onComplete={handleAnimationComplete}
            scrollHeight={scrollHeight}
            viewportHeight={viewportHeight}
          />
        </Canvas>
      </div>
    </>
  )
}

export default RocketScrollButton
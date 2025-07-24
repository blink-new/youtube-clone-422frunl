import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null!)
  
  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      temp.set([
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ], i * 3)
    }
    return temp
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff0000"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingCubes() {
  const meshRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const cubes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      rotationSpeed: Math.random() * 0.02 + 0.01
    }))
  }, [])

  return (
    <group ref={meshRef}>
      {cubes.map((cube, index) => (
        <FloatingCube
          key={index}
          position={cube.position}
          scale={cube.scale}
          rotationSpeed={cube.rotationSpeed}
        />
      ))}
    </group>
  )
}

function FloatingCube({ position, scale, rotationSpeed }: {
  position: [number, number, number]
  scale: number
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.7
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#065fd4"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedPoints />
        <FloatingCubes />
      </Canvas>
    </div>
  )
}
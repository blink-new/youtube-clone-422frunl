import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, Image } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { formatDistanceToNow } from 'date-fns'

interface Video3DProps {
  title: string
  channel: string
  views: string
  uploadedAt: Date
  duration: string
  thumbnail: string
  channelAvatar: string
}

function Video3DModel({ 
  isHovered, 
  thumbnail, 
  title, 
  channel, 
  views, 
  uploadedAt, 
  duration 
}: Video3DProps & { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const cardRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
    
    if (cardRef.current) {
      const targetScale = isHovered ? 1.05 : 1
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <RoundedBox
        ref={cardRef}
        args={[4, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      
      {/* Thumbnail */}
      <RoundedBox
        args={[3.8, 2.1, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.2, 0.06]}
      >
        <meshStandardMaterial color="#f0f0f0" />
      </RoundedBox>
      
      {/* Duration badge */}
      <RoundedBox
        args={[0.6, 0.2, 0.02]}
        radius={0.02}
        smoothness={4}
        position={[1.5, -0.7, 0.07]}
      >
        <meshStandardMaterial color="#000000" opacity={0.8} transparent />
      </RoundedBox>
      
      <Text
        position={[1.5, -0.7, 0.08]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {duration}
      </Text>
      
      {/* Title */}
      <Text
        position={[0, -1.2, 0.06]}
        fontSize={0.12}
        color="#0f0f0f"
        anchorX="center"
        anchorY="top"
        maxWidth={3.5}
      >
        {title}
      </Text>
      
      {/* Channel info */}
      <Text
        position={[0, -1.5, 0.06]}
        fontSize={0.08}
        color="#606060"
        anchorX="center"
        anchorY="top"
      >
        {channel} • {views} • {formatDistanceToNow(uploadedAt)} ago
      </Text>
    </group>
  )
}

export default function VideoCard3D(props: Video3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="relative w-full aspect-video cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-64 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, 5]} intensity={0.4} />
          <Video3DModel {...props} isHovered={isHovered} />
        </Canvas>
      </div>
    </motion.div>
  )
}
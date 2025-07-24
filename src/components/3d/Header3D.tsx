import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, Video, Bell, User, Plus } from 'lucide-react'
import * as THREE from 'three'
import { useAuth } from '../../hooks/useAuth'
import { VideoUpload } from '../VideoUpload'

function FloatingLogo() {
  const logoRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={logoRef}>
      <RoundedBox args={[1.5, 0.8, 0.2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#ff0000" />
      </RoundedBox>
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/roboto-bold.woff"
      >
        YouTube
      </Text>
    </group>
  )
}

function SearchBar3D({ isExpanded }: { isExpanded: boolean }) {
  const searchRef = useRef<THREE.Group>(null!)
  
  useFrame(() => {
    if (searchRef.current) {
      const targetScale = isExpanded ? 1.1 : 1
      searchRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={searchRef}>
      <RoundedBox args={[4, 0.6, 0.1]} radius={0.3} smoothness={4}>
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      <RoundedBox args={[3.8, 0.4, 0.05]} radius={0.2} smoothness={4} position={[0, 0, 0.06]}>
        <meshStandardMaterial color="#f8f8f8" />
      </RoundedBox>
    </group>
  )
}

export default function Header3D() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Left section with 3D logo */}
        <div className="flex items-center space-x-4">
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
          
          <div className="w-32 h-12">
            <Canvas
              camera={{ position: [0, 0, 3], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[2, 2, 2]} intensity={0.8} />
              <FloatingLogo />
            </Canvas>
          </div>
        </div>

        {/* Center search with 3D effects */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="h-16">
              <Canvas
                camera={{ position: [0, 0, 2], fov: 50 }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[2, 2, 2]} intensity={0.8} />
                <SearchBar3D isExpanded={isSearchExpanded} />
              </Canvas>
            </div>
            
            <div className="absolute inset-0 flex items-center">
              <motion.input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
                className="w-full px-4 py-2 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.button
                className="absolute right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-r-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right section with animated buttons */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <motion.button
                onClick={() => setShowUpload(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Create</span>
              </motion.button>
              
              <motion.button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-6 h-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
              
              <motion.button
                onClick={logout}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={`Signed in as ${user?.email}`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={login}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Video Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <VideoUpload
            isOpen={showUpload}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
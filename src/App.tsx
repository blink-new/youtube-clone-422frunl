import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header3D from './components/3d/Header3D'
import Sidebar3D from './components/3d/Sidebar3D'
import HomePage3D from './components/3d/HomePage3D'
import ThreeBackground from './components/3d/ThreeBackground'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-blue-600 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            YouTube 3D
          </motion.h1>
          <motion.p
            className="text-white/80 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Loading immersive experience...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Global 3D Background */}
      <ThreeBackground />
      
      {/* Header */}
      <Header3D />
      
      {/* Sidebar */}
      <Sidebar3D isCollapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <HomePage3D sidebarCollapsed={sidebarCollapsed} />
      
      {/* Floating particles overlay */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/10 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth, 0],
              y: [0, Math.random() * window.innerHeight, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
      
      {/* Menu toggle button (mobile) */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            "0 4px 15px rgba(0,0,0,0.1)",
            "0 8px 25px rgba(255,0,0,0.2)",
            "0 4px 15px rgba(0,0,0,0.1)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          ☰
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default App
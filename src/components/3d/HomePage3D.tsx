import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoCard3D from './VideoCard3D'
import ThreeBackground from './ThreeBackground'

const categories = [
  'All', 'Music', 'Gaming', 'News', 'Sports', 'Entertainment', 
  'Education', 'Science & Technology', 'Travel', 'Food', 'Fashion'
]

const mockVideos = [
  {
    id: '1',
    title: 'Building a Modern React App with Three.js - Complete Tutorial',
    channel: 'TechMaster Pro',
    views: '2.1M views',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: '15:42',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    title: 'JavaScript ES2024 Features You Need to Know - Complete Guide',
    channel: 'CodeWithJohn',
    views: '856K views',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: '22:18',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    title: 'The Future of Web Development - AI, 3D, and Beyond',
    channel: 'Future Tech',
    views: '1.3M views',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    duration: '18:35',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox - When to Use Each Layout Method',
    channel: 'Design Academy',
    views: '3.2M views',
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    duration: '45:12',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '5',
    title: 'Creating Stunning 3D Animations with Framer Motion',
    channel: 'Animation Studio',
    views: '742K views',
    uploadedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    duration: '28:47',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '6',
    title: 'Modern UI/UX Design Principles - From Figma to Code',
    channel: 'Design Studio',
    views: '1.8M views',
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    duration: '31:22',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '7',
    title: 'TypeScript Advanced Patterns - Generic Types & Utility Types',
    channel: 'TypeScript Master',
    views: '923K views',
    uploadedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    duration: '26:15',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '8',
    title: 'Building a Full-Stack YouTube Clone - React, Node.js, MongoDB',
    channel: 'Full Stack Dev',
    views: '2.7M views',
    uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    duration: '1:23:45',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '9',
    title: 'Next.js 14 App Router - Complete Guide with Server Components',
    channel: 'Next.js Pro',
    views: '1.5M views',
    uploadedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
    duration: '35:28',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '10',
    title: 'Docker for Developers - Containerization Made Simple',
    channel: 'DevOps Academy',
    views: '1.1M views',
    uploadedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    duration: '42:15',
    thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '11',
    title: 'GraphQL vs REST API - Which Should You Choose in 2024?',
    channel: 'API Expert',
    views: '687K views',
    uploadedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    duration: '19:33',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '12',
    title: 'Mastering Git and GitHub - Advanced Workflows for Teams',
    channel: 'Git Guru',
    views: '2.3M views',
    uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    duration: '52:07',
    thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=480&h=270&fit=crop&crop=center',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  }
]

interface HomePage3DProps {
  sidebarCollapsed: boolean
}

export default function HomePage3D({ sidebarCollapsed }: HomePage3DProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleVideos, setVisibleVideos] = useState(8)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        setVisibleVideos(prev => Math.min(prev + 4, mockVideos.length))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Content */}
      <div 
        className={`transition-all duration-300 pt-20 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Category Filter Bar */}
        <motion.div
          className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 py-4 shadow-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 max-w-screen-2xl mx-auto">
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: selectedCategory === category 
                      ? "0 8px 25px rgba(239, 68, 68, 0.3)" 
                      : "0 4px 12px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Grid Container */}
        <motion.div
          className="px-6 py-8 max-w-screen-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Responsive Video Grid */}
          <div className="video-grid">
            <AnimatePresence mode="popLayout">
              {mockVideos.slice(0, visibleVideos).map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  layout
                  className="group"
                  style={{
                    // Ensure proper aspect ratio for video cards
                    aspectRatio: '16/12'
                  }}
                >
                  <VideoCard3D
                    title={video.title}
                    channel={video.channel}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                    duration={video.duration}
                    thumbnail={video.thumbnail}
                    channelAvatar={video.channelAvatar}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Loading indicator */}
          {visibleVideos < mockVideos.length && (
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="flex items-center space-x-4 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">Loading more videos...</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating action button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-xl z-50 flex items-center justify-center"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 12px 30px rgba(239, 68, 68, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -8, 0],
          boxShadow: [
            "0 8px 20px rgba(239, 68, 68, 0.3)",
            "0 12px 30px rgba(239, 68, 68, 0.4)",
            "0 8px 20px rgba(239, 68, 68, 0.3)"
          ]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-xl"
        >
          ✨
        </motion.div>
      </motion.button>
    </div>
  )
}
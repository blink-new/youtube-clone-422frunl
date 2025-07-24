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
    title: 'Amazing 3D Animation Tutorial - Create Stunning Visuals',
    channel: 'TechCreator',
    views: '2.1M views',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: '15:42',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    title: 'React Three Fiber - Building Interactive 3D Experiences',
    channel: 'WebDev Pro',
    views: '856K views',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: '22:18',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    title: 'The Future of Web Development - 3D Interfaces',
    channel: 'Future Tech',
    views: '1.3M views',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    duration: '18:35',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    title: 'Three.js Masterclass - From Beginner to Expert',
    channel: 'Code Academy',
    views: '3.2M views',
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    duration: '45:12',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '5',
    title: 'Creating Immersive Web Experiences with WebGL',
    channel: 'Graphics Guru',
    views: '742K views',
    uploadedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    duration: '28:47',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '6',
    title: 'Modern UI/UX Design Trends 2024',
    channel: 'Design Studio',
    views: '1.8M views',
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    duration: '31:22',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '7',
    title: 'Advanced Animation Techniques in CSS and JavaScript',
    channel: 'Animation Master',
    views: '923K views',
    uploadedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    duration: '26:15',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '8',
    title: 'Building a YouTube Clone - Full Stack Tutorial',
    channel: 'Full Stack Dev',
    views: '2.7M views',
    uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    duration: '1:23:45',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  }
]

interface HomePage3DProps {
  sidebarCollapsed: boolean
}

export default function HomePage3D({ sidebarCollapsed }: HomePage3DProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleVideos, setVisibleVideos] = useState(6)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        setVisibleVideos(prev => Math.min(prev + 3, mockVideos.length))
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <div className="relative min-h-screen">
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
          className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6">
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {mockVideos.slice(0, visibleVideos).map((video, index) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  layout
                  className="group"
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
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="flex space-x-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating action button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 8px 25px rgba(255,0,0,0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -5, 0],
          boxShadow: [
            "0 4px 15px rgba(255,0,0,0.2)",
            "0 8px 25px rgba(255,0,0,0.3)",
            "0 4px 15px rgba(255,0,0,0.2)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          ✨
        </motion.div>
      </motion.button>
    </div>
  )
}
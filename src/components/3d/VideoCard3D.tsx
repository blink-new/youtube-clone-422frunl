import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { Play, MoreVertical } from 'lucide-react'

interface Video3DProps {
  title: string
  channel: string
  views: string
  uploadedAt: Date
  duration: string
  thumbnail: string
  channelAvatar: string
}

export default function VideoCard3D({
  title,
  channel,
  views,
  uploadedAt,
  duration,
  thumbnail,
  channelAvatar
}: Video3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <motion.div
      className="group cursor-pointer w-full video-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Video Thumbnail Container */}
      <div className="thumbnail-container mb-3">
        {/* Thumbnail Image */}
        <motion.img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          onLoad={() => setImageLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        
        {/* Duration Badge */}
        <motion.div
          className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {duration}
        </motion.div>
        
        {/* Play Button Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
      
      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <motion.div
          className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={channelAvatar}
            alt={channel}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        
        {/* Video Details */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <motion.h3
            className="font-medium text-sm leading-5 text-gray-900 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors duration-200"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            {title}
          </motion.h3>
          
          {/* Channel Name */}
          <motion.p
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer mb-1"
            whileHover={{ scale: 1.02 }}
          >
            {channel}
          </motion.p>
          
          {/* Views and Upload Date */}
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <span>{views}</span>
            <span>•</span>
            <span>{formatDistanceToNow(uploadedAt)} ago</span>
          </div>
        </div>
        
        {/* More Options Button */}
        <motion.button
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreVertical className="w-4 h-4" />
        </motion.button>
      </div>
      
      {/* 3D Card Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)'
            : 'transparent',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(239, 68, 68, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}
        animate={{
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(239, 68, 68, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
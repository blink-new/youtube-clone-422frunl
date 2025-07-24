import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  Download,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare
} from 'lucide-react'

interface SidebarItem {
  icon: React.ElementType
  label: string
  isActive?: boolean
  hasNotification?: boolean
}

const mainItems: SidebarItem[] = [
  { icon: Home, label: 'Home', isActive: true },
  { icon: Compass, label: 'Explore' },
  { icon: PlaySquare, label: 'Subscriptions', hasNotification: true },
]

const libraryItems: SidebarItem[] = [
  { icon: PlaySquare, label: 'Library' },
  { icon: Clock, label: 'History' },
  { icon: PlaySquare, label: 'Your videos' },
  { icon: Clock, label: 'Watch later' },
  { icon: ThumbsUp, label: 'Liked videos' },
  { icon: Download, label: 'Downloads' },
]

const exploreItems: SidebarItem[] = [
  { icon: Music, label: 'Music' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Newspaper, label: 'News' },
  { icon: Trophy, label: 'Sports' },
  { icon: Lightbulb, label: 'Learning' },
  { icon: Shirt, label: 'Fashion & Beauty' },
]

const settingsItems: SidebarItem[] = [
  { icon: Settings, label: 'Settings' },
  { icon: Flag, label: 'Report history' },
  { icon: HelpCircle, label: 'Help' },
  { icon: MessageSquare, label: 'Send feedback' },
]

interface SidebarItemProps {
  item: SidebarItem
  isCollapsed: boolean
  index: number
}

function SidebarItemComponent({ item, isCollapsed, index }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      className={`relative flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
        item.isActive 
          ? 'bg-red-50 text-red-600' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        x: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative"
        animate={{ 
          rotate: isHovered ? [0, -5, 5, 0] : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6" />
        {item.hasNotification && (
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            className="ml-6 text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

interface SidebarSectionProps {
  title?: string
  items: SidebarItem[]
  isCollapsed: boolean
  startIndex: number
}

function SidebarSection({ title, items, isCollapsed, startIndex }: SidebarSectionProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {title && !isCollapsed && (
        <motion.h3
          className="px-3 mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
      )}
      <div className="space-y-1">
        {items.map((item, index) => (
          <SidebarItemComponent
            key={item.label}
            item={item}
            isCollapsed={isCollapsed}
            index={startIndex + index}
          />
        ))}
      </div>
    </motion.div>
  )
}

interface Sidebar3DProps {
  isCollapsed: boolean
}

export default function Sidebar3D({ isCollapsed }: Sidebar3DProps) {
  return (
    <motion.aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="p-4">
          <SidebarSection
            items={mainItems}
            isCollapsed={isCollapsed}
            startIndex={0}
          />
          
          {!isCollapsed && (
            <motion.div
              className="border-t border-gray-200 my-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          )}
          
          <SidebarSection
            title="Library"
            items={libraryItems}
            isCollapsed={isCollapsed}
            startIndex={mainItems.length}
          />
          
          {!isCollapsed && (
            <motion.div
              className="border-t border-gray-200 my-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            />
          )}
          
          <SidebarSection
            title="Explore"
            items={exploreItems}
            isCollapsed={isCollapsed}
            startIndex={mainItems.length + libraryItems.length}
          />
          
          {!isCollapsed && (
            <motion.div
              className="border-t border-gray-200 my-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
          )}
          
          <SidebarSection
            items={settingsItems}
            isCollapsed={isCollapsed}
            startIndex={mainItems.length + libraryItems.length + exploreItems.length}
          />
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full"
            animate={{
              x: [0, Math.random() * 200, 0],
              y: [0, Math.random() * 400, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
    </motion.aside>
  )
}
import { useState, useEffect } from 'react'
import { blink } from '../blink/client'

interface Video {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  videoUrl?: string
  duration?: number
  viewCount: number
  likeCount: number
  dislikeCount: number
  userId: string
  channelName?: string
  channelAvatar?: string
  createdAt: string
  updatedAt: string
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const result = await blink.db.videos.list({
        orderBy: { createdAt: 'desc' },
        limit: 50
      })
      setVideos(result)
      setError(null)
    } catch (err) {
      setError('Failed to fetch videos')
      console.error('Error fetching videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const createVideo = async (videoData: {
    title: string
    description?: string
    thumbnailUrl?: string
    videoUrl?: string
    duration?: number
    channelName?: string
    channelAvatar?: string
  }) => {
    try {
      const user = await blink.auth.me()
      const newVideo = await blink.db.videos.create({
        id: `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...videoData,
        userId: user.id,
        viewCount: 0,
        likeCount: 0,
        dislikeCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      setVideos(prev => [newVideo, ...prev])
      return newVideo
    } catch (err) {
      console.error('Error creating video:', err)
      throw err
    }
  }

  const updateVideoViews = async (videoId: string) => {
    try {
      const video = videos.find(v => v.id === videoId)
      if (!video) return

      await blink.db.videos.update(videoId, {
        viewCount: video.viewCount + 1
      })

      setVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, viewCount: v.viewCount + 1 } : v
      ))
    } catch (err) {
      console.error('Error updating video views:', err)
    }
  }

  const likeVideo = async (videoId: string, type: 'like' | 'dislike') => {
    try {
      const user = await blink.auth.me()
      
      // Check if user already liked/disliked this video
      const existingLike = await blink.db.likes.list({
        where: { 
          AND: [
            { userId: user.id },
            { videoId: videoId }
          ]
        }
      })

      if (existingLike.length > 0) {
        // Remove existing like/dislike
        await blink.db.likes.delete(existingLike[0].id)
        
        // Update video counts
        const video = videos.find(v => v.id === videoId)
        if (video) {
          const updateData = existingLike[0].type === 'like' 
            ? { likeCount: Math.max(0, video.likeCount - 1) }
            : { dislikeCount: Math.max(0, video.dislikeCount - 1) }
          
          await blink.db.videos.update(videoId, updateData)
          setVideos(prev => prev.map(v => 
            v.id === videoId ? { ...v, ...updateData } : v
          ))
        }
      }

      // Add new like/dislike if different type or first time
      if (existingLike.length === 0 || existingLike[0].type !== type) {
        await blink.db.likes.create({
          id: `like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          videoId: videoId,
          commentId: null,
          type: type,
          createdAt: new Date().toISOString()
        })

        // Update video counts
        const video = videos.find(v => v.id === videoId)
        if (video) {
          const updateData = type === 'like' 
            ? { likeCount: video.likeCount + 1 }
            : { dislikeCount: video.dislikeCount + 1 }
          
          await blink.db.videos.update(videoId, updateData)
          setVideos(prev => prev.map(v => 
            v.id === videoId ? { ...v, ...updateData } : v
          ))
        }
      }
    } catch (err) {
      console.error('Error liking video:', err)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return {
    videos,
    loading,
    error,
    fetchVideos,
    createVideo,
    updateVideoViews,
    likeVideo
  }
}
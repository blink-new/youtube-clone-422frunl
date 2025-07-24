import { useState, useEffect, useCallback } from 'react'
import { blink } from '../blink/client'

interface Comment {
  id: string
  videoId: string
  userId: string
  content: string
  likeCount: number
  createdAt: string
  userDisplayName?: string
  userAvatar?: string
}

export const useComments = (videoId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    if (!videoId) return
    
    try {
      setLoading(true)
      const result = await blink.db.comments.list({
        where: { videoId: videoId },
        orderBy: { createdAt: 'desc' },
        limit: 100
      })
      setComments(result)
      setError(null)
    } catch (err) {
      setError('Failed to fetch comments')
      console.error('Error fetching comments:', err)
    } finally {
      setLoading(false)
    }
  }, [videoId])

  const addComment = async (content: string) => {
    try {
      const user = await blink.auth.me()
      const newComment = await blink.db.comments.create({
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        videoId: videoId,
        userId: user.id,
        content: content,
        likeCount: 0,
        createdAt: new Date().toISOString()
      })
      
      setComments(prev => [newComment, ...prev])
      return newComment
    } catch (err) {
      console.error('Error adding comment:', err)
      throw err
    }
  }

  const likeComment = async (commentId: string) => {
    try {
      const user = await blink.auth.me()
      
      // Check if user already liked this comment
      const existingLike = await blink.db.likes.list({
        where: { 
          AND: [
            { userId: user.id },
            { commentId: commentId }
          ]
        }
      })

      if (existingLike.length > 0) {
        // Remove like
        await blink.db.likes.delete(existingLike[0].id)
        
        // Update comment like count
        const comment = comments.find(c => c.id === commentId)
        if (comment) {
          await blink.db.comments.update(commentId, {
            likeCount: Math.max(0, comment.likeCount - 1)
          })
          setComments(prev => prev.map(c => 
            c.id === commentId ? { ...c, likeCount: Math.max(0, c.likeCount - 1) } : c
          ))
        }
      } else {
        // Add like
        await blink.db.likes.create({
          id: `like_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          videoId: null,
          commentId: commentId,
          type: 'like',
          createdAt: new Date().toISOString()
        })

        // Update comment like count
        const comment = comments.find(c => c.id === commentId)
        if (comment) {
          await blink.db.comments.update(commentId, {
            likeCount: comment.likeCount + 1
          })
          setComments(prev => prev.map(c => 
            c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c
          ))
        }
      }
    } catch (err) {
      console.error('Error liking comment:', err)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [videoId, fetchComments])

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    likeComment
  }
}
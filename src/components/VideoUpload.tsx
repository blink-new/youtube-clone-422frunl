import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Play, FileVideo } from 'lucide-react'
import { blink } from '../blink/client'
import { useAuth } from '../hooks/useAuth'
import { useVideos } from '../hooks/useVideos'

interface VideoUploadProps {
  isOpen: boolean
  onClose: () => void
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const { createVideo } = useVideos()
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleVideoFile = (file: File) => {
    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoPreview(url)
    
    // Auto-generate title from filename
    if (!formData.title) {
      const name = file.name.replace(/\.[^/.]+$/, '')
      setFormData(prev => ({ ...prev, title: name }))
    }
  }

  const handleThumbnailFile = (file: File) => {
    setThumbnailFile(file)
    const url = URL.createObjectURL(file)
    setThumbnailPreview(url)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    const imageFile = files.find(file => file.type.startsWith('image/'))

    if (videoFile) {
      handleVideoFile(videoFile)
    }
    if (imageFile) {
      handleThumbnailFile(imageFile)
    }
  }

  const handleVideoUpload = async () => {
    if (!videoFile || !user) return

    try {
      setUploading(true)
      setUploadProgress(0)

      // Upload video file
      const videoUploadResult = await blink.storage.upload(
        videoFile,
        `videos/${user.id}/${Date.now()}_${videoFile.name}`,
        {
          upsert: true,
          onProgress: (percent) => setUploadProgress(percent * 0.7) // 70% for video
        }
      )

      let thumbnailUrl = ''
      if (thumbnailFile) {
        // Upload thumbnail
        const thumbnailUploadResult = await blink.storage.upload(
          thumbnailFile,
          `thumbnails/${user.id}/${Date.now()}_${thumbnailFile.name}`,
          {
            upsert: true,
            onProgress: (percent) => setUploadProgress(70 + percent * 0.3) // 30% for thumbnail
          }
        )
        thumbnailUrl = thumbnailUploadResult.publicUrl
      }

      // Create video record
      await createVideo({
        title: formData.title,
        description: formData.description,
        videoUrl: videoUploadResult.publicUrl,
        thumbnailUrl: thumbnailUrl,
        channelName: user.displayName || user.email,
        channelAvatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
      })

      setUploadProgress(100)
      
      // Reset form
      setVideoFile(null)
      setThumbnailFile(null)
      setVideoPreview(null)
      setThumbnailPreview(null)
      setFormData({ title: '', description: '' })
      
      // Close modal after success
      setTimeout(() => {
        onClose()
        setUploading(false)
        setUploadProgress(0)
      }, 1000)

    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
      setUploadProgress(0)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Upload Video</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Video Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? 'border-red-500 bg-red-50'
                : videoFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {videoPreview ? (
              <div className="space-y-4">
                <video
                  src={videoPreview}
                  className="w-full max-w-md mx-auto rounded-lg"
                  controls
                />
                <p className="text-sm text-gray-600">{videoFile?.name}</p>
                <button
                  onClick={() => {
                    setVideoFile(null)
                    setVideoPreview(null)
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove video
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileVideo className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your video here, or{' '}
                    <label className="text-red-500 hover:text-red-700 cursor-pointer">
                      browse
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleVideoFile(file)
                        }}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">MP4, WebM, AVI up to 100MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail (Optional)
            </label>
            <div className="flex items-center space-x-4">
              {thumbnailPreview ? (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-32 h-18 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setThumbnailFile(null)
                      setThumbnailPreview(null)
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload thumbnail</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleThumbnailFile(file)
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter video title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Tell viewers about your video..."
              />
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={uploading}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleVideoUpload}
              disabled={!videoFile || !formData.title || uploading}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
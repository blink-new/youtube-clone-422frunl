import { MoreVertical, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail: string
    duration: string
    views: string
    uploadedAt: Date
    channel: {
      name: string
      avatar: string
      verified?: boolean
    }
  }
  className?: string
}

export function VideoCard({ video, className }: VideoCardProps) {
  return (
    <div className={`group cursor-pointer ${className}`}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&crop=center`
          }}
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
      </div>

      {/* Video info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={video.channel.avatar} alt={video.channel.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {video.channel.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Video details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                {video.channel.name}
              </span>
              {video.channel.verified && (
                <div className="w-3 h-3 bg-muted-foreground rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-background rounded-full" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{formatDistanceToNow(video.uploadedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        {/* More options */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
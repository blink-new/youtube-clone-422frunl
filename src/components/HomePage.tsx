import { VideoCard } from './VideoCard'

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Building a Modern React Application with TypeScript and Tailwind CSS',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    duration: '15:42',
    views: '125K',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    channel: {
      name: 'Tech Tutorials',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '2',
    title: 'The Future of Web Development: What to Expect in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    duration: '22:15',
    views: '89K',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    channel: {
      name: 'Web Dev Weekly',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '3',
    title: 'Amazing Nature Documentary: Wildlife in 4K',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop',
    duration: '45:30',
    views: '2.1M',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    channel: {
      name: 'Nature Films',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '4',
    title: 'Cooking the Perfect Pasta: Italian Chef Secrets',
    thumbnail: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=225&fit=crop',
    duration: '12:08',
    views: '456K',
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    channel: {
      name: 'Culinary Masters',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=40&h=40&fit=crop&crop=face',
      verified: false
    }
  },
  {
    id: '5',
    title: 'Space Exploration: Journey to Mars Mission Update',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop',
    duration: '28:45',
    views: '1.8M',
    uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    channel: {
      name: 'Space Science',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '6',
    title: 'Guitar Masterclass: Learn Advanced Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    duration: '35:20',
    views: '234K',
    uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    channel: {
      name: 'Music Academy',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
      verified: false
    }
  },
  {
    id: '7',
    title: 'Fitness Transformation: 30-Day Challenge Results',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop',
    duration: '18:33',
    views: '678K',
    uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    channel: {
      name: 'Fitness Journey',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '8',
    title: 'Travel Vlog: Hidden Gems in Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop',
    duration: '24:17',
    views: '892K',
    uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    channel: {
      name: 'Travel Stories',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '9',
    title: 'AI and Machine Learning Explained Simply',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
    duration: '31:55',
    views: '1.2M',
    uploadedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    channel: {
      name: 'AI Explained',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '10',
    title: 'Photography Tips: Mastering Natural Light',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop',
    duration: '16:42',
    views: '345K',
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    channel: {
      name: 'Photo Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      verified: false
    }
  },
  {
    id: '11',
    title: 'Cryptocurrency Market Analysis 2024',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
    duration: '27:18',
    views: '567K',
    uploadedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    channel: {
      name: 'Crypto Insights',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '12',
    title: 'Home Gardening: Growing Vegetables Indoors',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=225&fit=crop',
    duration: '19:25',
    views: '123K',
    uploadedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    channel: {
      name: 'Garden Life',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      verified: false
    }
  }
]

interface HomePageProps {
  sidebarOpen: boolean
}

export function HomePage({ sidebarOpen }: HomePageProps) {
  return (
    <main 
      className={`pt-14 transition-all duration-300 ${
        sidebarOpen ? 'ml-60' : 'ml-16'
      }`}
    >
      <div className="p-6">
        {/* Category filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {[
            'All', 'Music', 'Gaming', 'News', 'Sports', 'Technology', 
            'Cooking', 'Travel', 'Education', 'Entertainment'
          ].map((category, index) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? 'bg-foreground text-background'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </main>
  )
}
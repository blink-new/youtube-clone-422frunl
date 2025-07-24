import { useState } from 'react'
import { Search, Menu, Mic, Video, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-14 flex items-center px-4 gap-4">
      {/* Left section - Menu and Logo */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-muted rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
            </div>
          </div>
          <span className="text-xl font-medium ml-1 hidden sm:block">YouTube</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-auto flex items-center gap-2">
        <div className="flex-1 flex items-center">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-12 border border-border rounded-l-full rounded-r-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <Button
            variant="outline"
            className="h-10 px-6 border-l-0 rounded-l-none rounded-r-full border-border hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-muted ml-2"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>

      {/* Right section - Actions and Profile */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-muted hidden sm:flex"
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-muted hidden sm:flex"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
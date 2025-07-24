import { Home, Compass, PlaySquare, Clock, ThumbsUp, Download, History, ListVideo, Settings, HelpCircle, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  className?: string
}

const mainNavItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Compass, label: 'Explore' },
  { icon: PlaySquare, label: 'Subscriptions' },
]

const libraryItems = [
  { icon: ListVideo, label: 'Library' },
  { icon: History, label: 'History' },
  { icon: Clock, label: 'Watch later' },
  { icon: ThumbsUp, label: 'Liked videos' },
  { icon: Download, label: 'Downloads' },
]

const settingsItems = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
  { icon: Flag, label: 'Send feedback' },
]

export function Sidebar({ isOpen, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-background border-r border-border transition-all duration-300 z-40 overflow-y-auto',
        isOpen ? 'w-60 translate-x-0' : 'w-16 -translate-x-0',
        className
      )}
    >
      <div className="p-3 space-y-1">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start h-10 px-3',
                !isOpen && 'px-2 justify-center',
                item.active && 'bg-muted font-medium'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </Button>
          ))}
        </div>

        {isOpen && <Separator className="my-3" />}

        {/* Library Section */}
        {isOpen && (
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium text-muted-foreground">Library</h3>
            </div>
            {libraryItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start h-10 px-3"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="ml-3 truncate">{item.label}</span>
              </Button>
            ))}
          </div>
        )}

        {isOpen && <Separator className="my-3" />}

        {/* Subscriptions Section */}
        {isOpen && (
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3>
            </div>
            {/* Mock subscription channels */}
            {[
              { name: 'Tech Channel', avatar: 'T' },
              { name: 'Music Hub', avatar: 'M' },
              { name: 'Gaming Zone', avatar: 'G' },
              { name: 'News Today', avatar: 'N' },
            ].map((channel) => (
              <Button
                key={channel.name}
                variant="ghost"
                className="w-full justify-start h-10 px-3"
              >
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium shrink-0">
                  {channel.avatar}
                </div>
                <span className="ml-3 truncate">{channel.name}</span>
              </Button>
            ))}
          </div>
        )}

        {isOpen && <Separator className="my-3" />}

        {/* Settings Section */}
        <div className="space-y-1">
          {settingsItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                'w-full justify-start h-10 px-3',
                !isOpen && 'px-2 justify-center'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* Footer */}
        {isOpen && (
          <div className="pt-4 pb-2">
            <div className="px-3 text-xs text-muted-foreground space-y-1">
              <p>About Press Copyright</p>
              <p>Contact us Creators</p>
              <p>Advertise Developers</p>
              <p className="pt-2">Terms Privacy Policy & Safety</p>
              <p>How YouTube works</p>
              <p>Test new features</p>
              <p className="pt-2 text-muted-foreground/70">© 2024 YouTube Clone</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
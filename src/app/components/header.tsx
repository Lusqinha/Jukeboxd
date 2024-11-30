import { Settings, User } from 'lucide-react'
import { Button } from "@/app/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>

      <h1 className="text-xl font-semibold">Jukeboxd</h1>

      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </header>
  )
}
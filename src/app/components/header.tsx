import { Settings } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import Link from 'next/link'

export function Header() {
  return (
    <div className="bg-black">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-white" />
        </Button>

        <h1 className="text-xl text-white font-semibold">Jukeboxd</h1>

        <Button asChild variant='outline'>
          <Link href="/login">Login</Link>
        </Button>
      </header>
    </div>
  )
}
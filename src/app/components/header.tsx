"use-client"
import { Settings } from 'lucide-react'
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/button"


export function Header() {
  return (
    <div className="bg-black">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-white" />
        </Button>

        <h1 className="text-xl text-white font-semibold">Jukeboxd</h1>

        <Button variant='outline' onClick={() => signIn("spotify")}>Login</Button>
      </header>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Settings, LogOut } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/app/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { signOut } from 'next-auth/react'

interface UserHeaderProps {
  userName: string;
  userEmail: string;
  userAvatar: string;
}

export default function UserHeader({ userName, userEmail, userAvatar }: UserHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="flex items-center space-x-3 focus:outline-none">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block font- font-bold text-white" >
            {userName}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


"use-client"
import { Settings } from 'lucide-react'
import { signIn } from "next-auth/react";

import { Button } from "@/app/components/ui/button"
import { useSession } from "next-auth/react";
import UserHeader from './user-header';
import { Skeleton } from "@/app/components/ui/skeleton"
import Link from 'next/link';

export function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-black">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-xl text-white font-semibold">Jukeboxd</h1>
        {status === "loading" ? (
          <Skeleton className="w-[100px] h-[40px] rounded-full bg-zinc-800" />
        ) : session?.user ? (
          <UserHeader 
            userName={session.user.name!} 
            userEmail={session.user.email!} 
            userAvatar={session.user.image!} 
          />
        ) : (
          <Link href={'login'}>
            <Button variant="outline">
              Entrar
            </Button>
          </Link>
        )}
      </header>
    </div>
  )
}

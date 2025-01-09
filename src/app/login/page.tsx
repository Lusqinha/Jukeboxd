"use client";
import { Button } from "@/app/components/ui/button"
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>
          <Button type="button" className="w-full" onClick={() => signIn()}>
            Entrar
          </Button>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input";

import { UserCredentials } from "@/@types/user";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [user, setUser] = useState<UserCredentials>({
        email: '',
        password: '',
    });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(user);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({...user, [name]: value});
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Entrar</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              onChange={(e) => handleInput(e)}
              id="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <Input
              onChange={(e) => handleInput(e)}
              id="password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Não tem uma conta? <Link href="/register" className="text-blue-500">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

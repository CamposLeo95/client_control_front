"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {

  const router = useRouter()
  const [login, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    })
    if (res.ok) {
      router.push("/app/dashboard")
    } else {
      setError("Usuário ou senha inválidos")
    }
  }
  
return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded"
          required
          value={login}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        {error && (
          <div className="text-red-500">{error}</div> 
         )}
      </form>
    </div>
  )

}
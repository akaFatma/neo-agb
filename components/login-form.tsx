"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate authentication
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, any email/password combination works
      toast({
        variant: "success",
        title: "Login successful",
        description: "Welcome back to the Banking Portal",
      })
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-custom py-8 bg-white">
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <img src="/images/logo.svg" className=" w-30 h-10 object-contain" />
          <h1 className="text-3xl font-bold text-center py-6">Bienvenue</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="agent@bankname.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="w-full mt-6 shadow-xl"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

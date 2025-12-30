"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { setCredentials, setLoading, setError, clearError } from '@/redux/features/authSlice'
import type { AppDispatch, RootState } from '@/redux/store'

export function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth ?? { loading: false, error: null })

  useEffect(() => {
    dispatch(clearError())
    dispatch(setLoading(false)) // Reset loading state when the component is mounted
  }, [dispatch])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(setLoading(true))
    dispatch(clearError())

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch('https://advertisemedia.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      dispatch(setCredentials({
        message: "Login successful",
        token: data.token,
        user: data.user
      }));

      toast({
        title: "Login successful!",
        description: `Welcome back to The Advertising Hub!`,
      })

      if (data.user && data.user.role) {
        router.push(`/dashboard/${data.user.role.toLowerCase()}`);
      } else {
        throw new Error("User role is missing in the response.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid email or password. Please try again."
      dispatch(setError(errorMessage));
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="border-2">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={loading}
              className="border-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-muted-foreground underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required disabled={loading} className="border-2" />
          </div>
          <Button type="submit" className="w-full uppercase" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { setCredentials, setLoading, setError, clearError, logout } from '@/redux/features/authSlice'
import type { AppDispatch, RootState } from '@/redux/store'
export function SignupForm() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth ?? { loading: false, error: null })

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(setLoading(true))
    dispatch(clearError())

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("name") as string
    const companyName = formData.get("company") as string
    const userRole = formData.get("role") as string
    const role = userRole.toUpperCase()

    try {
      const response = await fetch('https://advertisemedia.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          password,
          role
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      if (!data.token) {
        throw new Error('No token received from server');
      }

      dispatch(setCredentials({
        message: data.message,
        token: data.token,
        user: data.user
      }));
      
      toast({
        title: "Success",
        description: data.message,
      });
      
      router.push(`/dashboard/${userRole.toLowerCase()}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      dispatch(setError(errorMessage));
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      dispatch(setLoading(false))
    }
  }

  function handleLogout() {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="border-2">
        <CardContent className="pt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required disabled={loading} className="border-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc."
                required
                disabled={loading}
                className="border-2"
              />
            </div>
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required disabled={loading} className="border-2" />
          </div>
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup defaultValue="advertiser" name="role" required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advertiser" id="advertiser" />
                <Label htmlFor="advertiser" className="font-normal">
                  Advertiser
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="font-normal">
                  Regular User
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="font-normal">
                  Admin (Internal Staff Only)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded border-2" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </Label>
          </div>
          <Button type="submit" className="w-full uppercase" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
          
        </CardContent>
      </Card>
    </form>
  )
}
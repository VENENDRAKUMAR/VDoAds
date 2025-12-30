
import React from "react";
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground mt-2">Join VDoAds advertising platform</p>
          </div>

          <SignupForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="underline font-medium hover:text-primary">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm">
          <p>© {new Date().getFullYear()} VDoAds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


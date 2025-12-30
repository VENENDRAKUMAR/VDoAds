
import { LoginForm } from "@/components/login-form"
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
     
      <main className="flex-1 container py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Advertising Portal</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your advertisements</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="underline font-medium hover:text-primary">
                Register now
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


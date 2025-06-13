import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen">
      {/* Left half - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Banking Portal</h1>
            <p className="text-muted-foreground mt-2">Back-office account management system</p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right half - Image */}
      <div className="hidden lg:block w-1/2 gradient-bg">
        <div className="h-full flex items-center justify-center p-8">
          <img
            src="/placeholder.svg?height=600&width=600"
            alt="Banking illustration"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </main>
  )
}

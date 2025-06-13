import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      <img
        src="/images/bg.svg"
        className="absolute inset-0 w-screen object-cover -z-10 "
      />
      <div className="w-full flex items-center justify-center p-8 z-10 ">
        <div className="w-full max-w-md">
          
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

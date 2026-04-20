"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    
    if (result.success) {
      // If the password is correct, the JWT is set, and we go to the dashboard
      router.push("/admin/dashboard");
    } else {
      // If wrong, we show the error message
      setError(result.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-sans">
      <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light text-zinc-100 tracking-tighter">
            MALL <span className="text-amber-500 font-bold">CORE</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">Enter admin credentials to continue</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <input 
              name="password"
              type="password" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Admin Password"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
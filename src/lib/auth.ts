// src/lib/auth.ts

export interface SignUpData {
    name: string;
    email: string;
    password: string;
  }
  
  export async function signUp(data: SignUpData) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Registration failed");
    }
    return res.json();
  }
  
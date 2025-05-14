// app/api/auth/register/route.ts

import { NextResponse } from "next/server";
// (You’d normally import your database client & bcrypt here)

export async function POST(request: Request) {
  const { name, email } = await request.json();

// …later you’ll replace _password with real hashing logic

  // 🔧 TODO: replace this stub with real DB logic & password hashing
  console.log("Registering user:", { name, email });

  // For now, just return success:
  return NextResponse.json({ ok: true });
}

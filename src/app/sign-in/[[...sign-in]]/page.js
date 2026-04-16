"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a2540, #1b3a5c)",
      paddingTop: 96,
    }}>
      <SignIn
        forceRedirectUrl="/api/tms"
      />
    </div>
  )
}

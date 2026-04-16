"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a2540, #1b3a5c)",
      paddingTop: 96,
    }}>
      <SignUp
        forceRedirectUrl="/dashboard"
      />
    </div>
  )
}

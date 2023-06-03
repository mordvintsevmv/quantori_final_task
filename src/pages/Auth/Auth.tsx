import "./Auth.scss"

import { FC, useState } from "react"

import LoginModal from "./LoginModal.tsx"
import RegisterModal from "./RegisterModal.tsx"

const Auth: FC = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login")

  const handleSetRegister = () => {
    setAuthType("register")
  }

  const handleSetLogin = () => {
    setAuthType("login")
  }

  return (
    <div className="auth">
      <div className="auth-modal">
        {authType === "login" ? (
          <LoginModal handleSetRegister={handleSetRegister} />
        ) : (
          <RegisterModal handleSetLogin={handleSetLogin} />
        )}
      </div>
    </div>
  )
}

export default Auth

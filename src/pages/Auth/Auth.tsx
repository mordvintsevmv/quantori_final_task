import "./Auth.scss"

import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useTypedSelector } from "../../hooks/reduxHooks.ts"
import LoginModal from "./LoginModal.tsx"
import RegisterModal from "./RegisterModal.tsx"

const Auth: FC = () => {
  const [authType, setAuthType] = useState<"login" | "register">("login")

  const { user } = useTypedSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/search")
    }
  }, [navigate, user])

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

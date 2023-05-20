import "./Main.css"

import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useTypedSelector } from "../../hooks/reduxHooks.ts"

const Main: FC = () => {
  const { user } = useTypedSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/search")
    }
  }, [navigate, user])

  const handleLoginClick = () => {
    navigate("/auth")
  }

  return (
    <div className="main">
      <div className="main__info">
        <h1 className="main__title">{"Q-1 Search"}</h1>
        <p className="main__description">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u"
          }
        </p>
        <button className="main__login-btn" onClick={handleLoginClick}>
          {"Login"}
        </button>
      </div>
    </div>
  )
}

export default Main

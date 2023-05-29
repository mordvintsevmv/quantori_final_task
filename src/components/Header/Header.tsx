import "./Header.css"

import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { logoutUserAsync } from "../../api/firebase.ts"
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks.ts"
import { resetSearch } from "../../redux/slices/searchSlice.ts"

const Header: FC = () => {
  const { user } = useTypedSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const handleLogoutClickAsync = async () => {
    await logoutUserAsync()
    dispatch(resetSearch())
    navigate("/")
  }

  const handleLoginClick = () => {
    navigate("/auth")
  }

  return (
    <header className="header">
      <div className="header__auth">
        <div className="header__email">{user?.email}</div>
        {user ? (
          <button className="header__log-btn" onClick={handleLogoutClickAsync}>
            {"log out"}
          </button>
        ) : (
          <button className="header__log-btn" onClick={handleLoginClick}>
            {"log in"}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

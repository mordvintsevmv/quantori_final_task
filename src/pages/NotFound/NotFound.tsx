import "./NotFound.css"

import { FC, Fragment } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header/Header.tsx"
import { useTypedSelector } from "../../hooks/reduxHooks.ts"

const NotFound: FC = () => {
  const navigate = useNavigate()

  const { user } = useTypedSelector((state) => state.auth)
  const { searchQuery } = useTypedSelector((state) => state.proteins)

  const handleBackClick = () => {
    if (user) {
      searchQuery
        ? navigate(`/search/?query=${searchQuery}`)
        : navigate(`/search`)
    } else {
      navigate("/")
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="not-found">
        <div className="not-found__block">
          <h1 className="not-found__404">{"404"}</h1>
          <p className="not-found__text">{"Page not found"}</p>
          <button
            className="button not-found__back-btn"
            onClick={handleBackClick}
          >
            {user ? "Back to Search" : "Back to Main"}
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default NotFound

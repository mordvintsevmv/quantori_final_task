import "./NotFound.css"

import { FC, Fragment } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header/Header.tsx"

const NotFound: FC = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/search")
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
            {"Back to Search"}
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default NotFound

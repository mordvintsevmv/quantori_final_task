import "./App.css"

import { Fragment, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "./api/firebase.ts"
import Loading from "./components/Loading/Loading.tsx"
import { useTypedDispatch, useTypedSelector } from "./hooks/reduxHooks.ts"
import Auth from "./pages/Auth/Auth.tsx"
import Main from "./pages/Main/Main.tsx"
import NotFound from "./pages/NotFound/NotFound.tsx"
import ProteinPage from "./pages/Protein/ProteinPage.tsx"
import Search from "./pages/Search/Search.tsx"
import { login, logout } from "./redux/slices/authSlice.ts"
import { statusType } from "./types/statusType.ts"

const App = () => {
  const dispatch = useTypedDispatch()
  const { user, authStatus } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            emailVerified: authUser.emailVerified,
            isAnonymous: authUser.isAnonymous,
            phoneNumber: authUser.phoneNumber,
            photoURL: authUser.photoURL,
          }),
        )
      } else {
        dispatch(logout())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Fragment>
      {authStatus === statusType.SUCCESS && (
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/search" /> : <Main />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/search" /> : <Auth />}
          />
          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/auth" />}
          />
          <Route
            path="/protein/:id"
            element={user ? <ProteinPage /> : <Navigate to="/auth" />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      )}
      {authStatus === statusType.IDLE && <Loading />}
    </Fragment>
  )
}

export default App

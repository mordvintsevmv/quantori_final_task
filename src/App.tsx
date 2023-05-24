import "./App.css"

import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "./api/firebase.ts"
import { useTypedDispatch } from "./hooks/reduxHooks.ts"
import Auth from "./pages/Auth/Auth.tsx"
import Main from "./pages/Main/Main.tsx"
import NotFound from "./pages/NotFound/NotFound.tsx"
import ProteinPage from "./pages/Protein/ProteinPage.tsx"
import Search from "./pages/Search/Search.tsx"
import { login, logout } from "./redux/slices/authSlice.ts"

const App = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
          }),
        )
      } else {
        dispatch(logout())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/search" element={<Search />} />
      <Route path="/protein/:id" element={<ProteinPage />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}

export default App

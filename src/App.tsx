import "./App.css"

import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "./api/firebase.ts"
import { useTypedDispatch } from "./hooks/reduxHooks.ts"
import Auth from "./pages/Auth/Auth.tsx"
import Main from "./pages/Main/Main.tsx"
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
    </Routes>
  )
}

export default App

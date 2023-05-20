import { FirebaseError } from "@firebase/util"

export const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-exists":
        return "User already exist!"
      case "auth/user-not-found":
        return "There is no such user!"
      case "auth/wrong-password":
        return "Wrong password!"
      case "auth/invalid-email":
        return "Invalid Email!"
      case "auth/invalid-password":
        return "Invalid Password!"
      default:
        return "Unknown error!"
    }
  } else {
    return "Unknown error!"
  }
}

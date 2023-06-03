export interface User {
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  isAnonymous: boolean
  phoneNumber: string | null
  photoURL: string | null
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { statusType } from "../../types/statusType.ts"
import { User } from "../../types/User.ts"

interface authState {
  user: User | null
  authStatus: statusType
}

const initialState: authState = {
  user: null,
  authStatus: statusType.IDLE,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
      state.authStatus = statusType.SUCCESS
    },
    logout: (state) => {
      state.user = null
      state.authStatus = statusType.SUCCESS
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

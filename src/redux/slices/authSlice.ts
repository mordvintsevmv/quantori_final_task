import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { User } from "../../types/User.ts"

interface authState {
  user: User | null
}

const initialState: authState = {
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./slices/authSlice.ts"
import { proteinReducer } from "./slices/proteinSlice.ts"

const reducer = combineReducers({
  auth: authReducer,
  proteins: proteinReducer,
})

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

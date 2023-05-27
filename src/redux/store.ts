import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { authReducer } from "./slices/authSlice.ts"
import { searchReducer } from "./slices/searchSlice.ts"

const reducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
})

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

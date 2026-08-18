import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import reduxLogger from "redux-logger"

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {},
})

// Infer the `RootState` and 'AppDispatch' types from the store itself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

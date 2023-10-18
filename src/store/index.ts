import { configureStore } from '@reduxjs/toolkit'
import { operatorReducer } from './slices'

export const store = configureStore({
  reducer: {
    operator: operatorReducer
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

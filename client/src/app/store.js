import { configureStore } from '@reduxjs/toolkit'
import my_state from "../feature/my_state/my_state_slice.js"

export const store = configureStore({
  reducer: {
    my_state
  },
})
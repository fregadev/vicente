import { createSlice } from "@reduxjs/toolkit"

const currentUserSlice = createSlice({
  name: "current-user",
  initialState: { status: "unauthenticated", userInfo: {} },
  reducers: {
    loginUser(state, action) {
      state.status = "logged-in"
      state.userInfo = action.payload
    },
    logoutUser(state, action) {
      state.status = "logged-out"
      state.userInfo = {}
    },
  },
})

export const { loginUser, logoutUser } = currentUserSlice.actions
export default currentUserSlice.reducer
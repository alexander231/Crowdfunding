import { createSlice } from "@reduxjs/toolkit"
import { gql, useQuery } from "@apollo/client"

const initialState = {
  loggedIn: false,
  userData: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeLoggedIn: (state) => {
      state.loggedIn = true
    },
    updateUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLoggedIn, updateUserData } = userSlice.actions

export default userSlice.reducer

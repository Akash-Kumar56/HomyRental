import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  token: null,
  tripList: [],
  wishList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
      state.tripList = []
    },
    setListings: (state, action) => {
      state.listings = action.payload
    },
    setTripList: (state, action) => {
      if (state.user) {
        state.user.tripList = action.payload;
      }
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload
    }
    

  }
})

export const { setLogin, setLogout, setListings, setTripList, setWishList, setPropertyList, setReservationList } = userSlice.actions
export default userSlice.reducer
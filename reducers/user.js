import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userId: null,
    firstname: null,
    lastname: null,
    email: null,
    avatar: null,
    token: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.userId = action.payload.userId;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },

    disconnectUser: (state, action) => {
      state.value.userId = null;
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.email = null;
      state.value.token = null;
    },
  },
});

export const { addUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {firstname: null, lastname: null, email: null, password: null, avatar: null, token: null}
};
// todo add userId

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.token = action.payload.token;
    },

    disconnectUser: (state, action) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.email = null;
      state.value.password = null;
      state.value.token = null;
    },
  },
});

export const { addUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;
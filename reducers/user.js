import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {firstname: null, lastname: null, email: null, password: null, avatar: null, token: null}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
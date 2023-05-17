import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {title: null, date: '', time: '', location: null, description: null}
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.value.title = action.payload.title;
      state.value.date = action.payload.date;
      state.value.time = action.payload.time;
      state.value.location = action.payload.location;
      state.value.description = action.payload.description;
    },
  },
});

export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
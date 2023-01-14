import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilter: {
      reducer(state, action) {
        state.filter = action.payload;
      },
      // prepare(text) {
      //   return {
      //     payload: {
      //       text,
      //     },
      //   };
      // },
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { api } from "../features/api"


const initialState: {status:boolean} = {
    status: false
};

// slice to handle dialog status
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    open: (state) => {
      state.status = true;
    },
    close: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.transfer.matchFulfilled,
      (state) => {
        state.status = false
      }
    )
  },
});

// export dialog actions
export const { open, close } = dialogSlice.actions;

// export dialog store 
export const selectDialog = (state: RootState) => state.dialog.status;

export default dialogSlice.reducer;

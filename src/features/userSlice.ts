import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setData: (state: any, action: PayloadAction<[]>) => {
      state;
      return action.payload;
    },
    addData: (state: any, action: PayloadAction<string>) => {
      return state.push(action.payload);
    },
  },
});

export const { setData, addData } = userSlice.actions;

export default userSlice.reducer;

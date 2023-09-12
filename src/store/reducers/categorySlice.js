import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {},
  reducers: {
    setSelectedCategory: (state, action) => {
      // Здесь можно обновить состояние категории
      console.log(action)
      return action.payload;
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;

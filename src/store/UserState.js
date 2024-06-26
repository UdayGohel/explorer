import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  pageNumber: 1,
  searchText: "",
  filter: "stars",
  sortType: "desc",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});
export const { setPageNumber, setSearchText, setFilter, setSortType } =
  userSlice.actions;
export default userSlice.reducer;

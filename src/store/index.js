import { configureStore } from "@reduxjs/toolkit";
import UserState from "./UserState";

const store = configureStore({
  reducer: {
    user: UserState,
  },
});
export default store;

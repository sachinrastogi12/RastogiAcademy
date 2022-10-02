import { configureStore } from "@reduxjs/toolkit";

// import authSlice from "./auth-slice";
import userInfoSlice from "./user-slice";

const store = configureStore({
  reducer: {
    // auth: authSlice.reducer,
    userInfo: userInfoSlice.reducer,
  },
});

export default store;

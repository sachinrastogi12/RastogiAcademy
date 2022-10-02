import { createSlice } from "@reduxjs/toolkit";

const initialUserInfo = {
  user_name: "",
  user_avatar: "",
  is_logged: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState: initialUserInfo,
  reducers: {
    setUserState(state, action) {
      console.log("in store", action.payload);
      state.user_name = action.payload.name;
      state.user_avatar = action.payload.photos[0];
      state.is_logged = true;
    },
    setUserLogout(state) {
      return initialUserInfo;
    },
  },
});

export const userInfoActions = userSlice.actions;
export default userSlice;

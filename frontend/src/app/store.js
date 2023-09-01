import { configureStore } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./../slices/userSlice";

export default configureStore({
  reducer: {
    userLogin: userLogin.reducer,
    userRegister: userRegister.reducer,
  },
});

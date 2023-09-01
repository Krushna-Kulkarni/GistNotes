import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./../slices/userSlice";

export default configureStore({
  reducer: { userAuth: userAuthReducer },
});

import { configureStore } from "@reduxjs/toolkit";
import { userLogin, userRegister, userUpdate } from "./../slices/userSlice";
import {
  noteList,
  createNote,
  updateNote,
  deleteNote,
} from "../slices/noteSlice";

export default configureStore({
  reducer: {
    userLogin: userLogin.reducer,
    userRegister: userRegister.reducer,
    userUpdate: userUpdate.reducer,
    noteList: noteList.reducer,
    createNote: createNote.reducer,
    updateNote: updateNote.reducer,
    deleteNote: deleteNote.reducer,
  },
});

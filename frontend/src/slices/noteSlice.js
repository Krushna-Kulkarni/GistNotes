import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
};

export const noteList = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    notesListRequest: (state) => {
      state.loading = true;
    },
    notesListSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    notesListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch(notesListRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get("/api/notes", config);

    dispatch(notesListSuccess(data));

    // localStorage.setItem("notes", JSON.stringify(data));
  } catch (error) {
    dispatch(
      notesListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const createNote = createSlice({
  name: "createNote",
  initialState,
  reducers: {
    createNoteRequest: (state) => {
      state.loading = true;
    },
    createNoteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    createNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(createNoteRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );

      dispatch(createNoteSuccess(data));
    } catch (error) {
      dispatch(
        createNoteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const updateNote = createSlice({
  name: "updateNote",
  initialState: {},
  reducers: {
    updateNoteRequest: (state) => {
      state.loading = true;
    },
    updateNoteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    updateNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(updateNoteRequest());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch(updateNoteSuccess(data));
    } catch (error) {
      dispatch(
        updateNoteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const deleteNote = createSlice({
  name: "deleteNote",
  initialState: {},
  reducers: {
    deleteNoteRequest: (state) => {
      state.loading = true;
    },
    deleteNoteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteNoteRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);

    dispatch(deleteNoteSuccess(data));
  } catch (error) {
    dispatch(
      deleteNoteFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const { notesList, notesListRequest, notesListSuccess, notesListFail } =
  noteList.actions;
export const { createNoteRequest, createNoteSuccess, createNoteFail } =
  createNote.actions;

export const { updateNoteRequest, updateNoteSuccess, updateNoteFail } =
  updateNote.actions;

export const { deleteNoteRequest, deleteNoteSuccess, deleteNoteFail } =
  deleteNote.actions;

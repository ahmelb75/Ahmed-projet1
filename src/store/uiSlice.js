import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
  modal: null, 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    setSuccess: (state, action) => {
      state.success = action.payload;
    },

    clearSuccess: (state) => {
      state.success = null;
    },

    openModal: (state, action) => {
      state.modal = action.payload;
    },

    closeModal: (state) => {
      state.modal = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;

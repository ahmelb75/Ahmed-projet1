import { configureStore } from "@reduxjs/toolkit";
import checklistReducer from "../store/checklistSlice";

export const store = configureStore({
  reducer: {
    checklist: checklistReducer,
  },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checklistAPI } from "../services/api1";

export const fetchChecklists = createAsyncThunk(
  "checklist/fetchAll",
  async () => {
    const data = await checklistAPI.getAll();
    return data.response || data.result || [];
  }
);

export const createChecklist = createAsyncThunk(
  "checklist/create",
  async (payload) => {
    const data = await checklistAPI.create(payload);
    return data;
  }
);

export const deleteChecklist = createAsyncThunk(
  "checklist/delete",
  async (id) => {
    await checklistAPI.delete(id);
    return id;
  }
);

export const updateChecklist = createAsyncThunk(
  "checklist/update",
  async (payload) => {
    await checklistAPI.update(payload);
    return payload;
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    etapes: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchChecklists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.etapes = action.payload;
        state.isLoading = false;
      })

      .addCase(createChecklist.fulfilled, (state, action) => {
        state.etapes.push(action.payload);
      })

      .addCase(deleteChecklist.fulfilled, (state, action) => {
        state.etapes = state.etapes.filter((e) => e.id !== action.payload);
      })

      .addCase(updateChecklist.fulfilled, (state, action) => {
        state.etapes = state.etapes.map((e) =>
          e.id === action.payload.id ? action.payload : e
        );
      });
  },
});

export default checklistSlice.reducer;

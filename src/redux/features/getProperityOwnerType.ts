import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { detailsType } from "@/type/addrealestate";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: detailsType[] | null;
}

export const getproperityOwnerType = createAsyncThunk<returnType>(
  "properityOwnerType",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get("https://server.mashrook.sa/property-owner-type")
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
interface initialInfo {
  loading: boolean;
  message: string | undefined;
  data: detailsType[] | null;
}
const initialstate: initialInfo = {
  loading: false,
  message: "",
  data: null,
};

const properityOwnerTypeSlice = createSlice({
  name: "properityOwnerType",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getproperityOwnerType.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getproperityOwnerType.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getproperityOwnerType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default properityOwnerTypeSlice.reducer;

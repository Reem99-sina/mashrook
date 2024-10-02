import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
interface getType {
  name: string;
}
export const getMessageOrders = createAsyncThunk<returnType>(
  "messageorder/get",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/room/property`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);

const initialstate = {
  loading: false,
  message: "",
  data: null,
};

const getMessageSlice = createSlice({
  name: "getMessgae",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMessageOrders.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMessageOrders.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default getMessageSlice.reducer;

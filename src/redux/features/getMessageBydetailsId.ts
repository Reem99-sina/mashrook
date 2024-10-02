import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
interface getIdType {
  id: number;
}

export const getMessageByDetailId = createAsyncThunk<returnType, getIdType>(
  "messageDetailById",
  async (data: getIdType, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/message/details/${data?.id}`, {
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

const getMessageByDetailIdSlice = createSlice({
  name: "getMessageByDetailId",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageByDetailId.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMessageByDetailId.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMessageByDetailId.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default getMessageByDetailIdSlice.reducer;

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
export const getMessageByLandId = createAsyncThunk<returnType, getIdType>(
  "messageDetailById",
  async (data: getIdType, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/message/land/${data?.id}`, {
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

const getMessageByLandIdSlice = createSlice({
  name: "getMessageByLandId",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageByLandId.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMessageByLandId.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMessageByLandId.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default getMessageByLandIdSlice.reducer;

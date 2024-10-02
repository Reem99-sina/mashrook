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
export const getMessagePartners = createAsyncThunk<returnType>(
  "partnersmessage/get",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/room/partners`, {
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

const getMessagePartnerSlice = createSlice({
  name: "getMessgaePartner",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessagePartners.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMessagePartners.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMessagePartners.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default getMessagePartnerSlice.reducer;

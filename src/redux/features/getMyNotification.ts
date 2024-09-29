import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
import { cityDetial, districtDetail } from "@/type/addrealestate";
import {messageInfo} from "@/type/chatinterface"
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: messageInfo[];
}
interface dataInfo {
  loading: boolean;
  message: string | undefined;
  data: messageInfo[]|null;
}
interface getType {
    notification_ids: number[]
}
export const getMyNotification = createAsyncThunk<returnType>(
  "notification/get",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/notification`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const readMessages = createAsyncThunk<returnType, getType>(
  "message/read",
  async (data: { notification_ids: number[] }, { rejectWithValue }) => {
    const response = await axios
      .put(`https://server.mashrook.sa/notification/read/`, data,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
const initialstate: dataInfo = {
  loading: false,
  message: "",
  data:null
};

const getNotificationSlice = createSlice({
  name: "getCity",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMyNotification.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMyNotification.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(readMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
        state.data = action?.payload?.data;
      }),
        builder.addCase(readMessages.pending, (state, action) => {
          state.loading = true;
          state.message = "";
          state.data = null;
        }),
        builder.addCase(readMessages.rejected, (state, action) => {
          state.loading = false;
          state.message = action.error.message ? action.error.message : "error";
          state.data = null;
        })
  },
});
export default getNotificationSlice.reducer;

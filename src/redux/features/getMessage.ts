import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
import { chatdetailinfo } from "@/type/chatinterface";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: chatdetailinfo | null;
}
interface getIdType {
  id: number;
}
interface sendMessage {
  room_id: number;
  message: string;
}
interface sendFileMessage {
  room_id: number;
  message: File;
}
export const getMessageByid = createAsyncThunk<returnType, getIdType>(
  "messageid/get",
  async (data: getIdType, { rejectWithValue }) => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_API}/message/${data?.id}`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const postMessage = createAsyncThunk<returnType, sendMessage>(
  "sendmessage",
  async (data: sendMessage, { rejectWithValue }) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/message`, data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const postFileMessage = createAsyncThunk<returnType, sendFileMessage>(
  "sendFileMessage",
  async (data: sendFileMessage, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("room_id", String(data?.room_id));
    formData.append("message", data?.message);

    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/message/upload`, formData, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
interface initalState {
  loading: boolean;
  message: string | undefined;
  data: chatdetailinfo | null;
}
const initialstate: initalState = {
  loading: false,
  message: "",
  data: null,
};

const getMessageByIdSlice = createSlice({
  name: "getMessageById",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageByid.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getMessageByid.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getMessageByid.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(postMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(postMessage.pending, (state, action) => {
        state.loading = true;
        state.message = "";
      }),
      builder.addCase(postMessage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(postFileMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(postFileMessage.pending, (state, action) => {
        state.loading = true;
        state.message = "";
      }),
      builder.addCase(postFileMessage.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
      });
  },
});
export default getMessageByIdSlice.reducer;

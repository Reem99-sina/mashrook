import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";
import { NextResponse } from "next/server";
import React from "react";

export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
export interface userLogin {
  email: string;
  password: string;
}
export interface forgetLogin {
  email: string;
}
export interface resetLogin {
  new_password: string;
  repeate_new_password: string;
  token: string;
}
export const login = createAsyncThunk<returnType, userLogin>(
  "login",
  async (data: userLogin, { rejectWithValue }) => {
    const response = await axios
      .post("https://server.mashrook.sa/auth/login", data)
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const forget = createAsyncThunk<returnType, forgetLogin>(
  "forget",
  async (data: forgetLogin, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/auth/forget-password", data)
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const reset = createAsyncThunk<returnType, resetLogin>(
  "reset",
  async (data: resetLogin, { rejectWithValue }) => {
    const response = await axios
      .put(
        "https://server.mashrook.sa/auth/reset-password",
        {
          new_password: data?.new_password,
          repeate_new_password: data?.repeate_new_password,
        },
        {
          headers: {
            Authorization: data?.token,
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const getUserRequest = createAsyncThunk(
  "putUser",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .put(
        "https://server.mashrook.sa/auth/token",
        {},
        {
          headers: {
            Authorization: Cookie.get("token"),
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
const initialstate = {
  loading: false,
  message: "",
  data: null,
  dataUser: null,
  messageForget: "",
  dataForget: null,
  messageRest: "",
  dataRest: null,
  // token:sessionStorage.getItem("token")
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialstate,
  reducers: {
    removeLogin: (state) => {
      state.message = "";
      state.data = null;
      state.dataUser = null;
    },
    removeForget: (state) => {
      state.messageForget = "";
      state.dataForget = null;
      state.messageRest = "";
      state.dataRest = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      Cookie.set("token", action?.payload?.data?.token);
      state.loading = false;
      state.message = action.payload.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(login.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(getUserRequest.fulfilled, (state, action) => {
        state.dataUser = action?.payload?.data;
      }),
      builder.addCase(getUserRequest.rejected, (state, action) => {
        state.dataUser = null;
        Cookie.remove("token");
      }),
      builder.addCase(getUserRequest.pending, (state, action) => {
        state.dataUser = null;
      }),
      builder.addCase(forget.fulfilled, (state, action) => {
        (state.messageForget = action?.payload?.message
          ? action?.payload?.message
          : "done"),
          (state.dataForget = action.payload.data);
      }),
      builder.addCase(forget.rejected, (state, action) => {
        (state.messageForget = action?.error?.message
          ? action?.error?.message
          : "error"),
          (state.dataForget = null);
      }),
      builder.addCase(forget.pending, (state, action) => {
        (state.messageForget = ""), (state.dataForget = null);
      }),
      builder.addCase(reset.rejected, (state, action) => {
        state.messageForget = "";
        state.dataForget = null;
        (state.messageRest = action?.error?.message
          ? action?.error?.message
          : "error"),
          (state.dataRest = null);
      }),
      builder.addCase(reset.fulfilled, (state, action) => {
        state.messageForget = "";
        state.dataForget = null;
        (state.messageRest = action?.payload?.message
          ? action?.payload?.message
          : "done"),
          (state.dataRest = action.payload.data);
      });
  },
});
export const { removeLogin, removeForget } = loginSlice.actions;
export default loginSlice.reducer;

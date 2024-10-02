//

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
interface comeType {
  receipt: File;
  property_id: number;
  land_details_id: number;
  amount: number;
  [key: string]: any;
}
export const uploadReciptPut = createAsyncThunk<returnType, comeType>(
  "recipt/update",
  async (data: comeType, { rejectWithValue }) => {
    const formData = new FormData();
    Object.keys(data).map((ele: string) => formData.append(ele, data[ele]));
    const response = await axios
      .post(`https://server.mashrook.sa/payment/upload-receipt`, formData, {
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

const uploadReciptSlice = createSlice({
  name: "uploadRecipt",
  initialState: initialstate,
  reducers: {
    // deleteOffer:(state,action)=>{
    //     state.data=action.payload.data
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadReciptPut.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(uploadReciptPut.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(uploadReciptPut.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});

export default uploadReciptSlice.reducer;

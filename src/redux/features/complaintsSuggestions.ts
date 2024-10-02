import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
import { cityDetial, districtDetail } from "@/type/addrealestate";
interface dataType{
    id: number,
    type:string,
  name:string,
  phone:string,
  title:string,
  details:string,
    user_id: null|number,
    updatedAt: string,
    createdAt: string
}
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data:dataType|null;
}

interface dataSend {
  type:string,
  name:string,
  phone:string,
  title:string,
  details:string
}
interface getType {
  name: string;
}
export const postComplaint = createAsyncThunk<returnType,dataSend>(
  "complaint/post",
  async (data:dataSend, { rejectWithValue }) => {
    if( Cookie.get("token")){
        const response = await axios
        .post(`https://server.mashrook.sa/complaint`, data,{
          headers: {
            Authorization: Cookie.get("token"),
          },
        })
        .then((response) => response.data)
        .catch((error) => error?.response?.data);
      return response;
    }else{
        const response = await axios
        .post(`https://server.mashrook.sa/complaint/no-login`,data)
        .then((response) => response.data)
        .catch((error) => error?.response?.data);
      return response;  
    } 
  }
);
export const getDistrict = createAsyncThunk<returnType, getType>(
  "district/get",
  async (data: { name: string }, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/data/district/${data?.name}`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
const initialstate: returnType = {
  loading: false,
  message: "",
  data:null
};

const ComplaintSlice = createSlice({
  name: "Complaint",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postComplaint.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(postComplaint.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(postComplaint.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      })
  },
});
export default ComplaintSlice.reducer;

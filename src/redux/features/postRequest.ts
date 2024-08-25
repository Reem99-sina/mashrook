import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
  
}

export interface paymentType {
    property_id: number,
    land_details_id?: number,
    amount:number
    details_id?: number
  }
export interface properityTypeInter {
  property_type_id?: Number | String |undefined; /// get the ids from property type getAll
  city?: String;
  district?: String[];
  price?: Number;
  min_price?: Number;
  status?: String; // حالة العقار
  finance?: Boolean;
  property_type_details_id?: Number; //نوع التملك نوع الدور نوع الشقة نوع الفيلا
  min_apartment_floor?: String; // الادوار الامرغوبة
  apartment_floor?: String;
  details?: {
    type: String;
    price: Number;
    min_price: Number;
  }[];
  [key: string]: unknown;
}
export interface properityErrorTypeInter {
    property_type_id?:  String ; /// get the ids from property type getAll
    city?: String;
    district?: String[];
    price?: String;
    min_price?: String;
    status?: String; // حالة العقار
    finance?: String;
    property_type_details_id?: String; //نوع التملك نوع الدور نوع الشقة نوع الفيلا
    min_apartment_floor?: String; // الادوار الامرغوبة
    apartment_floor?: String;
    details?: {
        type: String;
        price: Number;
        min_price: Number;
      }[];
    [key: string]: any;
  }

export const postProperityType = createAsyncThunk<
  returnType,
  properityTypeInter
>(
  "properityType/post",
  async (data: properityTypeInter, { rejectWithValue }) => {
    const response = await axios
      .post("https://server.mashrook.sa/property/request", data, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const postPaymentType = createAsyncThunk<
  returnType,
  paymentType
>(
  "paymentType/post",
  async (data: paymentType, { rejectWithValue }) => {
    const response = await axios
      .post("https://server.mashrook.sa/payment/property", data, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
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
  messagePayment:"",
  dataPayment:null
};

const properityTypeSlice = createSlice({
  name: "properityType",
  initialState: initialstate,
  reducers: {
    removeState: (state) => {
      state.loading=false,
      state.message= "",
      state.data=  null
    },
    removeStatePayment: (state) => {
      state.messagePayment="",
      state.dataPayment=null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postProperityType.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(postProperityType.pending, (state, action) => {
        state.loading = true;
        state.message = "loading...";
        state.data = null;
      }),
      builder.addCase(postProperityType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),builder.addCase(postPaymentType.fulfilled,(state, action) => {
        state.messagePayment=action?.payload?.message?action?.payload?.message:"error"
        state.dataPayment=action?.payload?.data?action?.payload?.data:null
      })
      ,builder.addCase(postPaymentType.rejected,(state, action) => {
        state.messagePayment=action.error.message ? action.error.message : "error"
      });
  },
});
export const { removeState ,removeStatePayment} = properityTypeSlice.actions;
export default properityTypeSlice.reducer;

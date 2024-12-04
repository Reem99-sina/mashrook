import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
export interface paymentType {
  property_id: number;
  land_details_id?: number;
  amount: number;
  details_id?: number;
  [key: string]: any;
}
export interface properityInfo {
  property_id: number;
  city: string;
  district: string[];
  lat?: number;
  long?: number;
  address?: string;
}
export interface properityTypeInter {
  id?: string;
  property_type_id?: Number | String | undefined; /// get the ids from property type getAll
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
  property_type_id?: String; /// get the ids from property type getAll
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
      .post(`${process.env.NEXT_PUBLIC_API}/property/request`, data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const postPaymentType = createAsyncThunk<returnType, paymentType>(
  "paymentType/post",
  async (data: paymentType, { rejectWithValue }) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/payment/property`, data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const postPaymentFileType = createAsyncThunk<returnType, paymentType>(
  "paymentfileType/post",
  async (data: paymentType, { rejectWithValue }) => {
    const formData = new FormData();
    Object?.keys(data)?.map((ele: any) => formData.append(ele, data[ele]));
    // data?.images?.forEach((image) => );
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/payment/upload-receipt`, formData, {
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
  messagePayment: "",
  dataPayment: null,
};

const properityTypeSlice = createSlice({
  name: "properityType",
  initialState: initialstate,
  reducers: {
    removeState: (state) => {
      (state.loading = false), (state.message = ""), (state.data = null);
    },
    removeStatePayment: (state) => {
      (state.messagePayment = ""), (state.dataPayment = null);
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
        state.message = "";
        state.data = null;
      }),
      builder.addCase(postProperityType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(postPaymentType.fulfilled, (state, action) => {
        state.messagePayment = action?.payload?.message
          ? action?.payload?.message
          : "error";
        state.dataPayment = action?.payload?.data
          ? action?.payload?.data
          : null;
      }),
      builder.addCase(postPaymentType.rejected, (state, action) => {
        state.messagePayment = action.error.message
          ? action.error.message
          : "error";
      }),
      builder.addCase(postPaymentFileType.fulfilled, (state, action) => {
        state.messagePayment = action?.payload?.message
          ? action?.payload?.message
          : "error";
        state.dataPayment = action?.payload?.data
          ? action?.payload?.data
          : null;
      }),
      builder.addCase(postPaymentFileType.rejected, (state, action) => {
        state.messagePayment = action.error.message
          ? action.error.message
          : "error";
      });
  },
});
export const { removeState, removeStatePayment } = properityTypeSlice.actions;
export default properityTypeSlice.reducer;

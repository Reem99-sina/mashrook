import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import {
  dataTypeOfRealEstate,
  detailsType,
  detailsMoreType,
} from "@/type/addrealestate";

export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: dataTypeOfRealEstate;
}
interface INitialInterface {
  loading: boolean;
  message: string | undefined;
  data: dataTypeOfRealEstate | null;
  title: string | undefined;
  details: detailsType[] | null | undefined;
  titleSection: string | undefined;
  detailsSection: detailsMoreType[] | null | undefined;
}
export interface returnMoreType {
  message: string;
  data: {
    title: string;
    details: detailsMoreType[];
  };
}
export interface properityTypeInter {
  property_type_id: Number; /// get the ids from property type getAll
  city: String;
  district: String;
  price: Number;
  min_price: Number;
  status: String; // حالة العقار
  finance: Boolean;
  type: String; //نوع التملك نوع الدور نوع الشقة نوع الفيلا
  min_apartment_floor: String; // الادوار الامرغوبة
  apartment_floor: String;
}
export interface propsInter {
  num: number;
}
export interface propsMoreInter {
  num: number;
  type: string;
}
export const getproperityType = createAsyncThunk<returnType, propsInter>(
  "properityType/get",
  async (data: propsInter, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/property-type/${data?.num}`)
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const getproperityTypeMore = createAsyncThunk<
  returnMoreType,
  propsMoreInter
>(
  "properityTypemore/get",
  async (data: propsMoreInter, { rejectWithValue }) => {
    const response = await axios
      .get(
        `https://server.mashrook.sa/property-type/section-details/${data?.type}/${data?.num}`
      )
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
const initialstate: INitialInterface = {
  loading: false,
  message: "",
  data: null,
  titleSection: "",
  detailsSection: null,
  title: "",
  details: null,
};

const properityTypeSlice = createSlice({
  name: "properityType",
  initialState: initialstate,
  reducers: {
    removeStatus: (state) => {
      (state.titleSection = ""), (state.detailsSection = []);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getproperityType.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
      (state.title = action.payload?.data?.title),
        (state.details = action.payload?.data?.details);
    }),
      builder.addCase(getproperityType.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getproperityType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(getproperityTypeMore.fulfilled, (state, action) => {
        state.titleSection = action.payload?.data?.title;
        state.detailsSection = action.payload?.data?.details;
      });
  },
});
export const { removeStatus } = properityTypeSlice.actions;
export default properityTypeSlice.reducer;

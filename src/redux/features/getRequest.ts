import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
export interface dataReturn {
  id: number;
  type: string;
  license_number: string;
  area: number;
  price: number;
  min_price: string | null;
  advertisement_number: string;
  partnership_amount: any;
  finance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  property_type_id: number;
  property_owner_type_id: number;
  property_purpose_id: number;
  propertyLocation: {
    id: number;
    lat: number;
    long: number;
    address: string;
    city: string;
    district: string;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  };
  landDetails: {
    id: number;
    is_divisible: boolean;
    piece_number: string;
    plan_number: string;
    type: string | null;
    createdAt: string;
    updatedAt: string;
    property_id: number;
    area: number;
    price: number;
  }[];
  details: {
    id: number;
    type: string;
    area: number;
    price: number;
    rooms_number: number;
    halls_number: number;
    bathrooms_number: number;
    kitchens_number: number;
    age: number;
    status: any;
    location: any;
    apartment_number: any;
    apartment_floor: any;
    min_apartment_floor: any;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  }[];
  amenities: any[];
  user: {
    id: number;
    username: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyType: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyPurpose: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyOwnerType: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };propertyTypeDetails:{
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }
  propertyMedia:{
    id: number,
    name: string,
    link: string,
    createdAt: string,
    updatedAt:string,
    property_id: number
  }[]
}
export interface typePay{
  
    id?: number;
    is_divisible?: boolean;
    piece_number?: string;
    plan_number?: string;
    type?: string | null;
    createdAt?: string;
    updatedAt?: string;
    area?: number;
    price?: number;
    rooms_number?: number;
    halls_number?: number;
    bathrooms_number?: number;
    kitchens_number?: number;
    age?: number;
    status?: any;
    location?: any;
    apartment_number?: any;
    apartment_floor?: any;
    min_apartment_floor?: any;
   
    property_id?: number;
}
export const getRequest = createAsyncThunk<returnType>(
  "requestGet",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get("https://server.mashrook.sa/property/offer", { headers: {} })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const getRequestByid = createAsyncThunk<returnType,{id:number}>(
  "requestGet/id",
  async (data:{id:number}, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/property/get/${data?.id}`, { headers: {} })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
const initialstate = {
  loading: false,
  message: "",
  data: null,
  selectData: null,
};

const requestGetSlice = createSlice({
  name: "properityGet",
  initialState: initialstate,
  reducers: {
    addUnqiue: (state, action) => {
      state.selectData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(getRequest.pending, (state, action) => {
        state.loading = true;
        state.message = "pending...";
        state.data = null;
      }),
      builder.addCase(getRequest.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(getRequestByid.fulfilled, (state, action) => {
        console.log("data",action.payload)
        state.loading = false;
        state.message = action.payload.message
          ? action.payload.message
          : "success";
        state.selectData = action.payload.data;
      }),builder.addCase(getRequestByid.rejected, (state, action) => {
        console.log("data",action.error.message)
      })
  },
});

export const { addUnqiue } = requestGetSlice.actions;
export default requestGetSlice.reducer;

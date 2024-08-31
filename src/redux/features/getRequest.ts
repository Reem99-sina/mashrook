import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
  status:number
}
interface typeofReport{
    
  property_id: number,
  message: string
}
export interface dataReturn {
  id: number;
  type: string;
  is_divisible?: boolean;
  age?: number;
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
    stage:string;
    available_percentage:number;
    available_price:number;
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
    stage:string;
    available_percentage:number;
    available_price:number;
    age: number;
    status: any;
    location: any;
    apartment_number: any;
    apartment_floor: any;
    min_apartment_floor: any;
    createdAt: string;
    updatedAt: string;
    property_id: number;
    amenities?:{
      pool?: boolean; // مزايا اضافية مسبح
      garden?: boolean; // مزايا اضافية
      servants_room?: boolean; // مزايا اضافية غرفة خدم
      ac?: boolean; // مزايا اضافية مكيفة
      furnished?: boolean; // مزايا اضافية مؤثثة
      kitchen?: boolean; // مزايا اضافية مطبخ راكب
      garage?: boolean;
      car_entrance?: boolean;  
    }
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
  };
  propertyTypeDetails: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyMedia: {
    id: number;
    name: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  }[];
}
export interface typePay {
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
  stage:string;
  available_percentage:number;
  available_price:number;
  property_id?: number;
}
interface paramsInput{
  min_price?:number|null,
max_price?:number|null,
property_type_details_id?:number|null,

property_purpose_id?:number|null|string,

min_percentage?:number|null,
max_percentage?:number|null
,status?:string|null
}
export const getRequest = createAsyncThunk<returnType,(paramsInput|null)>(
  "requestGet",
  async (data:(paramsInput|null), { rejectWithValue }) => {
    const response = await axios
      .get("https://server.mashrook.sa/property/offer", { headers: {} ,params:data?data:{}})
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const getRequestByid = createAsyncThunk<returnType, { id: number }>(
  "requestGet/id",
  async (data: { id: number }, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/property/get/${data?.id}`, {
        headers: {}
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const postReport=createAsyncThunk<returnType,typeofReport>("postReport", async (data:{
    
  property_id: number,
  message: string
}, { rejectWithValue }) => {  
  const response = await axios.post("https://server.mashrook.sa/property-report",data,{headers: {
    Authorization: sessionStorage.getItem("token"),
  },})
  .then((response)=>response.data)
  .catch((error)=>error?.response?.data) 
  return response;
})
const initialstate = {
  loading: false,
  message: "",
  data: null,
  selectData: null,
  messageReport:"",
  status:200
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
        state.message = "loading...";
        state.data = null;
      }),
      builder.addCase(getRequest.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(getRequestByid.fulfilled, (state, action) => {
       
        state.loading = false;
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
        state.selectData = action?.payload?.data;
      }),
      builder.addCase(getRequestByid.rejected, (state, action) => {
        console.log("data", action.error.message);
      }),builder.addCase(postReport.fulfilled,(state,action)=>{
        state.messageReport=action?.payload?.message?action?.payload?.message:""
        state.status=action?.payload?.status?action?.payload?.status:200
      })
  },
});

export const { addUnqiue } = requestGetSlice.actions;
export default requestGetSlice.reducer;

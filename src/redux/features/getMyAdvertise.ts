import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
interface dataSend{
    property_id:number
    ,amount:number
}
export interface returnType{
  loading:boolean,
  message:string | undefined,
  data:any
}
interface dataSendReciept{
    property_id:number,
    receipt:File,
    amount:number
}
export const getMyAdvertise=createAsyncThunk<returnType>("advertise/get", async (_, { rejectWithValue }) => {  
    const response = await axios.get(`https://server.mashrook.sa/property-advertising/mine`,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
export const postMyAdvertise=createAsyncThunk<returnType,dataSend>("advertise/get", async (data:dataSend, { rejectWithValue }) => {  
    const response = await axios.post(`https://server.mashrook.sa/payment/property-advertising`,{property_id:data?.property_id,amount:data?.amount},{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
export const postMyReceiptAdvertise=createAsyncThunk<returnType,dataSendReciept>("advertiseReceipt/get", async (data:dataSendReciept, { rejectWithValue }) => {  
    const response = await axios.post(`https://server.mashrook.sa/payment/upload-property-advertising-receipt`,{property_id:data?.property_id,amount:data?.amount},{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
// 
const initialstate={
loading:false,
message:"",
data:null,
}
const getAdvertiseSlice=createSlice({
    name:"getAdvertise",
    initialState:initialstate,
    reducers:{
    },extraReducers:(builder)=>{
        builder.addCase(getMyAdvertise.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getMyAdvertise.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getMyAdvertise.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default getAdvertiseSlice.reducer


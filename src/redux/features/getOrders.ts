import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
interface comeType{
    id:number
}
interface paramsInput{
    min_price?:number|null,
  max_price?:number|null,
  property_type_details_id?:number|null|string,
  city?:string|null,
  district?:string|null,
  property_purpose_id?:number|null|string
  ,status?:string|null,
  sort?:string|null
  }
export const getRequest=createAsyncThunk<returnType,(paramsInput|null)>("request/get", async (data:(paramsInput|null), { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/requests`,{
            headers: {
              Authorization: Cookie.get("token"),
            },
            params:data?data:{}
          })
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})
export const getOtherOrders=createAsyncThunk<returnType,comeType>("otherOrder/get", async (data:comeType, { rejectWithValue }) => {  
    const response = await axios.get(`https://server.mashrook.sa/property/get/alternative-offers/${data?.id}`,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})

const initialstate={
    loading:false,
    message:"",
    data:null,
    loadingOther:false,
    messageOther:"",
    dataOther:null,
}

const getRequestSlice=createSlice({
    name:"getrequest",
    initialState:initialstate,
    reducers:{
        deleteOrder:(state,action)=>{
            state.data=action.payload.data
        }
    },extraReducers:(builder)=>{
        builder.addCase(getRequest.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getRequest.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getRequest.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        }),
        builder.addCase(getOtherOrders.fulfilled,(state,action)=>{
            state.loadingOther=false
            state.messageOther=action?.payload?.message?action.payload.message:"success"
            state.dataOther=action?.payload?.data
        }),
        builder.addCase(getOtherOrders.pending,(state,action)=>{
            state.loadingOther=true
            state.messageOther=""
            state.dataOther=null
        }),
        builder.addCase(getOtherOrders.rejected,(state,action)=>{
            state.loadingOther=false
            state.messageOther=action.error.message?action.error.message:"error"
            state.dataOther=null
        })
    }
})
export const { deleteOrder } = getRequestSlice.actions;
export default getRequestSlice.reducer
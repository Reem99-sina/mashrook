import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
interface paramsInput{
    min_price?:number|null,
  max_price?:number|null,
  property_type_details_id?:number|null|string,
  city?:string|null,
  district?:string|null,
  property_purpose_id?:number|null|string
  ,status?:string|null,
  sort?:string|null,
  min_percentage?:number|null,
      max_percentage?:number|null,
  }
export const getOffer=createAsyncThunk<returnType,(paramsInput|null)>("Offer/get", async (data:(paramsInput|null), { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/offers`,{
            headers: {
              Authorization: Cookie.get("token"),
            },
            params:data?data:{}
          })
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})

const initialstate={
    loading:false,
    message:"",
    data:null,
   
}

const getOfferSlice=createSlice({
    name:"getOffer",
    initialState:initialstate,
    reducers:{
        deleteOffer:(state,action)=>{
            state.data=action.payload.data
        }
    },extraReducers:(builder)=>{
        builder.addCase(getOffer.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getOffer.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getOffer.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export const { deleteOffer } = getOfferSlice.actions;
export default getOfferSlice.reducer
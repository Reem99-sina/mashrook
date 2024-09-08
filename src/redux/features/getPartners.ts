import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
export interface comeType{
    id:number
}
export interface comeWithdrawType{
    details_id?: number
    ,
    land_details_id?:number
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
export const getPartner=createAsyncThunk<returnType,(paramsInput|null)>("partners/get", async (data:(paramsInput|null), { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/partners`,{
            headers: {
              Authorization: Cookie.get("token"),
            },
            params:data?data:{}
          })
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})
export const deleteProperty=createAsyncThunk<returnType,comeType>("property/delete", async (data:{id:number}, { rejectWithValue }) => {  
    const response = await axios.delete(`https://server.mashrook.sa/property/${data?.id}`,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
export const withDrawProperty=createAsyncThunk<returnType,comeWithdrawType>("property/withdraw", async (data:comeWithdrawType, { rejectWithValue }) => {  
    const response = await axios.post(`https://server.mashrook.sa/property-ownership/withdraw`,data,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
export const UpdataExpiredDateProperty=createAsyncThunk<returnType,comeType>("property/expireddata", async (data:comeType, { rejectWithValue }) => {  
    const response = await axios.put(`https://server.mashrook.sa/property/expire-date/${data?.id}`,{},{
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
   messageDelete:"",
   messageWithDraw:"",
   messsageExpiredDate:""
}

const getPartnerSlice=createSlice({
    name:"getpartner",
    initialState:initialstate,
    reducers:{
        removepartners:(state) => {
            state.data=null
          },
        withdrawData:(state,action)=>{
            state.data=action.payload.data
        },
        removeMessageWithDraw:(state)=>{
            state.messageWithDraw=""
        },
        removeDelete:(state)=>{
            state.messageDelete=""
            state.messsageExpiredDate=""
        }
    },extraReducers:(builder)=>{
        builder.addCase(getPartner.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getPartner.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getPartner.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        }),builder.addCase(deleteProperty.fulfilled,(state,action)=>{
           
            state.messageDelete=action?.payload?.message?action.payload.message:"success"
           
        }),
        builder.addCase(deleteProperty.pending,(state,action)=>{
            
            state.messageDelete=""
          
        }),
        builder.addCase(deleteProperty.rejected,(state,action)=>{
            state.loading=false
            state.messageDelete=action.error.message?action.error.message:"error"
        }),builder.addCase(withDrawProperty.fulfilled,(state,action)=>{
           
            state.messageWithDraw=action?.payload?.message?action.payload.message:"success"
           
        }),
        builder.addCase(withDrawProperty.pending,(state,action)=>{
            
            state.messageWithDraw=""
          
        }),
        builder.addCase(withDrawProperty.rejected,(state,action)=>{
            // state.loading=false
            state.messageWithDraw=action.error.message?action.error.message:"error"
        }),builder.addCase(UpdataExpiredDateProperty.fulfilled,(state,action)=>{
            state.messsageExpiredDate=action.payload.message?action.payload.message:""
            console.log(action.payload,"payload")
        }),builder.addCase(UpdataExpiredDateProperty.rejected,(state,action)=>{
            
        }),builder.addCase(UpdataExpiredDateProperty.pending,(state,action)=>{
            
        })
        // withDrawProperty
    }
})
export const { removepartners,withdrawData,removeMessageWithDraw,removeDelete } = getPartnerSlice.actions;
export default getPartnerSlice.reducer
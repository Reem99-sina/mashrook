import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}

export const getOffer=createAsyncThunk<returnType>("Offer/get", async (_, { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/offers`,{
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
            state.message="loading..."
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
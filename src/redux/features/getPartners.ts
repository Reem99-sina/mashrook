import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}

export const getPartner=createAsyncThunk<returnType>("partners/get", async (_, { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/partners`,{
            headers: {
              Authorization: sessionStorage.getItem("token"),
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

const getPartnerSlice=createSlice({
    name:"getpartner",
    initialState:initialstate,
    reducers:{
        removepartners:(state) => {
            state.data=null
          }
    },extraReducers:(builder)=>{
        builder.addCase(getPartner.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getPartner.pending,(state,action)=>{
            state.loading=true
            state.message="loading..."
            state.data=null
        }),
        builder.addCase(getPartner.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export const { removepartners } = getPartnerSlice.actions;
export default getPartnerSlice.reducer
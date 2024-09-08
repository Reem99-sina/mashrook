import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import {detailsType}from "@/type/addrealestate"
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:detailsType[]|null
}

export const getproperityPurposeType=createAsyncThunk<returnType>("properityPurpose", async (_, { rejectWithValue }) => {  
        const response = await axios.get("https://server.mashrook.sa/property-purpose")
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})
interface initialInfo{
    loading:boolean,
    message:string|undefined,
    data:detailsType[]|null
}
const initialstate:initialInfo={
    loading:false,
    message:"",
    data:null
}

const properityPurposeSlice=createSlice({
    name:"properityPurpose",
    initialState:initialstate,
    reducers:{
    },extraReducers:(builder)=>{
        builder.addCase(getproperityPurposeType.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getproperityPurposeType.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getproperityPurposeType.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default properityPurposeSlice.reducer
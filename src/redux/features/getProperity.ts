import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
export interface properityTypeInter {
    property_type_id: Number,/// get the ids from property type getAll
    city: String,
    district: String,
    price: Number,
    min_price: Number,
    status: String, // حالة العقار 
    finance: Boolean,
    type: String, //نوع التملك نوع الدور نوع الشقة نوع الفيلا
    min_apartment_floor: String, // الادوار الامرغوبة
    apartment_floor: String
}
export const getproperityType=createAsyncThunk<returnType>("properityType/get", async (_, { rejectWithValue }) => {  
        const response = await axios.get("https://server.mashrook.sa/property-type")
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})

const initialstate={
    loading:false,
    message:"",
    data:null
}

const properityTypeSlice=createSlice({
    name:"properityType",
    initialState:initialstate,
    reducers:{
    },extraReducers:(builder)=>{
        builder.addCase(getproperityType.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getproperityType.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(getproperityType.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default properityTypeSlice.reducer
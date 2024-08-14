import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
export interface properityTypeInter {
    property_type_id: number | undefined,/// get the ids from property type getAll
    city: String,
    district: String[],
    price: Number,
    min_price: Number,
    status: String, // حالة العقار 
    finance: Boolean,
    type: String, //نوع التملك نوع الدور نوع الشقة نوع الفيلا
    min_apartment_floor?: String, // الادوار الامرغوبة
    apartment_floor?: String
}

export const postProperityType=createAsyncThunk<returnType,properityTypeInter>("properityType/post", async (data:properityTypeInter, { rejectWithValue }) => {  
    const response = await axios.post("https://server.mashrook.sa/property/request",data,{headers:{
        "Authorization":sessionStorage.getItem("token")
    }})
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
        builder.addCase(postProperityType.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action.payload.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(postProperityType.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(postProperityType.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default properityTypeSlice.reducer
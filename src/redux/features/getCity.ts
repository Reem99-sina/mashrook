import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
interface getType{
    name:string
}
export const getCity=createAsyncThunk<returnType>("city/get", async (_, { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/data/city`,{
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          })
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})
export const getDistrict=createAsyncThunk<returnType,getType>("district/get", async (data:{name:string}, { rejectWithValue }) => {  
    const response = await axios.get(`https://server.mashrook.sa/data/district/${data?.name}`,{
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
    city:null,
   district:null
}

const getCitySlice=createSlice({
    name:"getCity",
    initialState:initialstate,
    reducers:{
    },extraReducers:(builder)=>{
        builder.addCase(getCity.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.city=action?.payload?.data
        }),
        builder.addCase(getCity.pending,(state,action)=>{
            state.loading=true
            state.message="loading..."
            state.city=null
        }),
        builder.addCase(getCity.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.city=null
        }), builder.addCase(getDistrict.fulfilled,(state,action)=>{
           
            state.district=action?.payload?.data
        })
    }
})
export default getCitySlice.reducer
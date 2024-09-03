import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}

export const getRequest=createAsyncThunk<returnType>("request/get", async (_, { rejectWithValue }) => {  
        const response = await axios.get(`https://server.mashrook.sa/property/get/mine/requests`,{
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
            state.message="loading..."
            state.data=null
        }),
        builder.addCase(getRequest.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export const { deleteOrder } = getRequestSlice.actions;
export default getRequestSlice.reducer
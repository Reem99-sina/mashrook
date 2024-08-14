import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
export interface userLogin {
    email: string;
    password: string;
  }
export const login=createAsyncThunk<returnType,userLogin>("login", async (data:userLogin, { rejectWithValue }) => {  
    const response = await axios.post("https://server.mashrook.sa/auth/login", data).then((response)=>response.data).catch((error)=>error?.response?.data) 
    return response;
})

const initialstate={
    loading:false,
    message:"",
    data:null
}

const loginSlice=createSlice({
    name:"login",
    initialState:initialstate,
    reducers:{

    },extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action.payload.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(login.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default loginSlice.reducer
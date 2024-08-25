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
export const getUserRequest=createAsyncThunk("putUser", async (_, { rejectWithValue }) => {  
    const response = await axios.put("https://server.mashrook.sa/auth/token", {},{ headers: {
        Authorization: sessionStorage.getItem("token"),
      }}).then((response)=>response.data).catch((error)=>error?.response?.data)// Adjust your endpoint as necessary
    return response // Return the user data from API response  
})
const initialstate={
    loading:false,
    message:"",
    data:null,dataUser:null
}

const loginSlice=createSlice({
    name:"login",
    initialState:initialstate,
    reducers:{
        removeLogin:(state)=>{
            state.message=""
            state.data=null
            state.dataUser=null
        }
    },extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action.payload.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(login.pending,(state,action)=>{
            state.loading=true
            state.message="loading..."
            state.data=null
        }),
        builder.addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        }), builder.addCase(getUserRequest.fulfilled,(state,action)=>{
            
            state.dataUser=action?.payload?.data
        }), builder.addCase(getUserRequest.rejected,(state,action)=>{
            state.dataUser=null
            
        }),builder.addCase(getUserRequest.pending,(state,action)=>{
            state.dataUser=null
        })
    }
})
export const { removeLogin } = loginSlice.actions;
export default loginSlice.reducer
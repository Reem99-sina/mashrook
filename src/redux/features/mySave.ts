import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from 'js-cookie';
export interface returnType{
    loading:boolean,
    message:string | undefined,
    data:any
}
interface comeType{
    property_id:number
}
interface comeIdType{
    id:number
}
export const postSave=createAsyncThunk<returnType,comeType>("save/post", async (data:comeType, { rejectWithValue }) => {  
        const response = await axios.post(`https://server.mashrook.sa/property-saved`,data,{
            headers: {
              Authorization: Cookie.get("token"),
            }
          })
        .then((response)=>response.data)
        .catch((error)=>error?.response?.data) 
        return response;
})
export const getSaves=createAsyncThunk<returnType>("save/get", async (_, { rejectWithValue }) => {  
    const response = await axios.get(`https://server.mashrook.sa/property-saved/mine`,{
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
    .then((response)=>response.data)
    .catch((error)=>error?.response?.data) 
    return response;
})
export const deleteSaves=createAsyncThunk<returnType,comeIdType>("save/deleteSaves", async (data:comeIdType, { rejectWithValue }) => {  
    const response = await axios.delete(`https://server.mashrook.sa/property-saved/${data?.id}`,{
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
    data:null
}

const saveSlice=createSlice({
    name:"save",
    initialState:initialstate,
    reducers:{
        deleteSave:(state)=>{
            state.loading=false
            state.message=""
            state.data=null
        }
    },extraReducers:(builder)=>{
        builder.addCase(postSave.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(postSave.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(postSave.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        }),
        builder.addCase(getSaves.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action?.payload?.data
        }),
        builder.addCase(getSaves.pending,(state,action)=>{
            state.loading=true
            state.message=""
            state.data=null
        }),
        builder.addCase(getSaves.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
        , builder.addCase(deleteSaves.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            // state.data=action?.payload?.data
        }),
        builder.addCase(deleteSaves.pending,(state,action)=>{
            state.loading=true
            state.message=""
            // state.data=null
        }),
        builder.addCase(deleteSaves.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            // state.data=null
        })
    }
})
export const { deleteSave } = saveSlice.actions;
export default saveSlice.reducer
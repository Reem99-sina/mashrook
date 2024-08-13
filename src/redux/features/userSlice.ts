import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface userRegister {
    username: string;
    email: string;
    password: string;
    repeate_password: string;
  }
export const register=createAsyncThunk("register", async (data:userRegister, { rejectWithValue }) => {  
        const response = await axios.post("https://server.mashrook.sa/auth", data).then((response)=>response.data).catch((error)=>error?.response?.data)  // Adjust your endpoint as necessary 
        return response; // Return the user data from API response  
})

const initialstate={
    loading:false,
    message:"",
    data:null
}

const userSlice=createSlice({
    name:"user",
    initialState:initialstate,
    reducers:{

    },extraReducers:(builder)=>{
        builder.addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(register.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default userSlice.reducer
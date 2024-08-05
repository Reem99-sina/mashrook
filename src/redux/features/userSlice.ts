import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const register=createAsyncThunk("register", async (data, { rejectWithValue }) => {  
        const response = await axios.post("http://54.91.216.53:8082/auth", data); // Adjust your endpoint as necessary 
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
            state.message=action.payload.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(register.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(register.rejected,(state,action)=>{
            console.log(action.error.message,"action.error.message")
            state.loading=false
            state.message=action.error.message
            state.data=null
        })
    }
})
export default userSlice.reducer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login=createAsyncThunk("login", async (data, { rejectWithValue }) => {  
        const response = await axios.post("http://localhost:8082/auth/login", data); // Adjust your endpoint as necessary 
        return response; // Return the user data from API response  
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
            console.log(action.error.message,"action.error.message")
            state.loading=false
            state.message=action.error.message
            state.data=null
        })
    }
})
export default loginSlice.reducer
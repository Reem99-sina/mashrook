import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface verifyEmail{
    email:string,
    code:string
}

export const verifyRequest=createAsyncThunk("verify", async (data:verifyEmail, { rejectWithValue }) => {  
        const response = await axios.put("http://54.91.216.53:8082/auth/code", data)// Adjust your endpoint as necessary
        console.log(response,"response") 
        return response.data; // Return the user data from API response  
})

const initialstate={
    loading:false,
    message:"",
    data:null
}
interface responseData{
    message:string,
    data:any

}
const verifySlice=createSlice({
    name:"verify",
    initialState:initialstate,
    reducers:{

    },extraReducers:(builder)=>{
        builder.addCase(verifyRequest.fulfilled,(state,action)=>{
            state.loading=false

            state.message=action?.payload?.message?action.payload.message:"success"
            state.data=action.payload.data
        }),
        builder.addCase(verifyRequest.pending,(state,action)=>{
            state.loading=true
            state.message="pending..."
            state.data=null
        }),
        builder.addCase(verifyRequest.rejected,(state,action)=>{
            console.log(action.error.message,"action.error.message")
            state.loading=false
            state.message=action.error.message?action.error.message:"error"
            state.data=null
        })
    }
})
export default verifySlice.reducer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const verifyRequest=createAsyncThunk("verify", async (data, { rejectWithValue }) => {  
        const response = await axios.post("http://54.91.216.53:8082/auth/code", data); // Adjust your endpoint as necessary 
        return response; // Return the user data from API response  
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
            state.loading=false
            state.message=action.error.message
            state.data=null
        })
    }
})
export default verifySlice.reducer
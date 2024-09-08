import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface verifyEmail {
  email: string;
  code: string;
}
interface verifyCodeEmail {
  email: string;
}
export const verifyRequest = createAsyncThunk(
  "verify",
  async (data: verifyEmail, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/auth/code", data)
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
export const resendCodeRequest = createAsyncThunk(
  "resendcode",
  async (data: verifyCodeEmail, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/auth/send-code", data)
      .then((response) => response.data)
      .catch((error) => error?.response?.data); // Adjust your endpoint as necessary
    return response; // Return the user data from API response
  }
);
const initialstate = {
  loading: false,
  message: "",
  data: null,
};
interface responseData {
  message: string;
  data: any;
}
const verifySlice = createSlice({
  name: "verify",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyRequest.fulfilled, (state, action) => {
      state.loading = false;

      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(verifyRequest.pending, (state, action) => {
        state.loading = true;
        state.message = "loading...";
        state.data = null;
      }),
      builder.addCase(verifyRequest.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(resendCodeRequest.fulfilled, (state, action) => {
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(resendCodeRequest.pending, (state, action) => {
        state.message = "loading...";
      }),
      builder.addCase(resendCodeRequest.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      });
  },
});
export default verifySlice.reducer;

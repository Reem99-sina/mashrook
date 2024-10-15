import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Banners,bannerinfo } from "@/type/addrealestate";
interface returnType{
    message:string
    data:Banners[]
}
export const getBanners = createAsyncThunk<returnType>(
  "banner/get",
  async (_, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/banner`)
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
const initialstate: bannerinfo = {
  loading: false,
  message: "",
  data: null
};

const getBanner = createSlice({
  name: "getBanner",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getBanners.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      })
  },
});
export default getBanner.reducer;

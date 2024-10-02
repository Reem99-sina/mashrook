import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
interface paramsInput {
  min_price?: number | null;
  max_price?: number | null;
  property_type_details_id?: number | null | string;
  city?: string | null;
  district?: string | null;
  property_purpose_id?: number | null | string;
  status?: string | null;
  sort?: string | null;
  min_percentage?: number | null;
  max_percentage?: number | null;
}
interface paramsDetail {
  detail_id?: number;
  land_detail_id?: number;
}
export const getOffer = createAsyncThunk<returnType, paramsInput | null>(
  "Offer/get",
  async (data: paramsInput | null, { rejectWithValue }) => {
    const response = await axios
      .get(`https://server.mashrook.sa/property/get/mine/offers`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
        params: data ? data : {},
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const deleteOfferDetailOrLand = createAsyncThunk<
  returnType,
  paramsDetail
>("detail/delete", async (data: paramsDetail, { rejectWithValue }) => {
  if (data?.detail_id) {
    const response = await axios
      .delete(
        `https://server.mashrook.sa/property/details/${data?.detail_id}`,
        {
          headers: {
            Authorization: Cookie.get("token"),
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  } else {
    const response = await axios
      .delete(
        `https://server.mashrook.sa/property/land-details/${data?.land_detail_id}`,
        {
          headers: {
            Authorization: Cookie.get("token"),
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
});
const initialstate = {
  loading: false,
  message: "",
  data: null,
};

const getOfferSlice = createSlice({
  name: "getOffer",
  initialState: initialstate,
  reducers: {
    deleteOffer: (state, action) => {
      state.data = action.payload.data;
    },
    deleteOfferDetail: (state, action) => {
      state.data = action.payload.data;
    },
    deleteMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action?.payload?.data;
    }),
      builder.addCase(getOffer.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(getOffer.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(deleteOfferDetailOrLand.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
        // state.data=action?.payload?.data
      }),
      builder.addCase(deleteOfferDetailOrLand.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        // state.data=null
      }),
      builder.addCase(deleteOfferDetailOrLand.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        // state.data=null
      });
  },
});
export const { deleteOffer, deleteOfferDetail, deleteMessage } =
  getOfferSlice.actions;
export default getOfferSlice.reducer;

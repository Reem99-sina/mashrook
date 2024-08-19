import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: any;
}
export interface RealEstateTypeInter {
  property_owner_type_id?: number; // وسيط عقاري, مطور عقاري, وسيط
  property_purpose_id?: number; //بيع, تطوير (شراكة برأس المال أو البناء)
  property_type_id?: number; /// get the ids from property type getAll
  property_type_details_id?: number; /// get the ids from property type getAll

  city?: string;
  district?: string;
  lat?: number;
  long?: number;
  address?: string;
  car_entrance?: boolean;
  plan_number?: string; // في حالة اختيار ارض (رقم المخطط)
  piece_number?: string; // في حالة اختيار ارض (رقم القطعة)
  area?: string;
  price?: number|string;
  is_divisible?: boolean; // قي حالة اختيار ارض  (هل العقار قابل للتجزئية)
  advertisement_number?: string; // رقم الاعلان
  license_number?: string; // رقم الرخصة في حالة اختيار وسيط عقاري او مطور عقاري
  partner_type_id?: number, /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلا))
  age?: number; //  في حالة الفيلا العمر
  location?: string; // في حالة الفيلا دور أرضي, دور علوي ,شقة
  apartment_number?: string; // في حالة الشقة رقم الشقة
  apartment_floor?: string; // في حالة الشقة رقم الدور
  rooms_number?: number; // في حالة الفيلا عدد الغرف
  halls_number?: number; // في حالة الفيلا عدد الصالات
  bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
  kitchens_number?: number; // في حالة الفيلا عدد المطابخ
  pool?: boolean; // مزايا اضافية مسبح
  garden?: boolean; // مزايا اضافية
  servants_room?: boolean; // مزايا اضافية غرفة خدم
  ac?: boolean; // مزايا اضافية مكيفة
  garage?:boolean;
  furnished?: boolean; // مزايا اضافية مؤثثة
  kitchen?: boolean; // مزايا اضافية مطبخ راكب
  partnership_amount?: number; // في حالة الاستثمار
  images?: File[];
  apartment?: {
    area?: number|string;
    price?: number|string;
    rooms_number?: number; // في حالة الفيلا عدد الغرف
    halls_number?: number; // في حالة الفيلا عدد الصالات
    bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
    kitchens_number?: number;
  };
  landDetails?:{
    area?: number|string;
    price?: number|string;
    piece_number?: string; 
    plan_number?: string; 

  }[],details?:earthInter[]
}
export interface RealEstateErrrorTypeInter {
  property_owner_type_id?: number; // وسيط عقاري, مطور عقاري, وسيط
  property_purpose_id?: number; //بيع, تطوير (شراكة برأس المال أو البناء)
  property_type_id?: number; /// get the ids from property type getAll
  property_type_details_id?: string; 
  city?: string;
  district?: string;
  lat?: number;
  long?: number;
  address?: string;
  car_entrance?: boolean;
  garage?:boolean;
  plan_number?: string; // في حالة اختيار ارض (رقم المخطط)
  piece_number?: string; // في حالة اختيار ارض (رقم القطعة)
  area?: string;
  price?: string;
  is_divisible?: boolean; // قي حالة اختيار ارض  (هل العقار قابل للتجزئية)
  advertisement_number?: string; // رقم الاعلان
  license_number?: string; // رقم الرخصة في حالة اختيار وسيط عقاري او مطور عقاري
  partner_type_id?: string, /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلstring; /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلا))
  age?: number; //  في حالة الفيلا العمر
  location?: string; // في حالة الفيلا دور أرضي, دور علوي ,شقة
  apartment_number?: string; // في حالة الشقة رقم الشقة
  apartment_floor?: string; // في حالة الشقة رقم الدور
  rooms_number?: number; // في حالة الفيلا عدد الغرف
  halls_number?: number; // في حالة الفيلا عدد الصالات
  bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
  kitchens_number?: number; // في حالة الفيلا عدد المطابخ
  pool?: boolean; // مزايا اضافية مسبح
  garden?: boolean; // مزايا اضافية
  servants_room?: boolean; // مزايا اضافية غرفة خدم
  ac?: boolean; // مزايا اضافية مكيفة
  furnished?: boolean; // مزايا اضافية مؤثثة
  kitchen?: boolean; // مزايا اضافية مطبخ راكب
  partnership_amount?: number; // في حالة الاستثمار
  images?: string;
  "apartment.area"?: string,
  "apartment.price"?: string,
  "apartment.rooms_number"?: string,
  "apartment.halls_number"?: string,
 "apartment.bathrooms_number"?: string,
  "apartment.kitchens_number"?: string,
details?:earthInter[],
apartment?: {
  area?: number|string;
  price?: number|string;
  rooms_number?: number; // في حالة الفيلا عدد الغرف
  halls_number?: number; // في حالة الفيلا عدد الصالات
  bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
  kitchens_number?: number;
};
landDetails?:{
  area?: number|string;
  price?: number|string;
  piece_number?: string; 
  plan_number?: string; 

}[]
}
export interface earthInter{
  type: string,
  area: string,
  price: number,
  rooms_number: number,// في حالة الفيلا عدد الغرف
  halls_number: number, // في حالة الفيلا عدد الصالات
  bathrooms_number: number, // في حالة الفيلا عدد دورات المياه
  kitchens_number: number, // في حالة الفيلا عدد المطابخ
  pool: boolean, // مزايا اضافية مسبح
  garden: boolean, // مزايا اضافية 
  servants_room: boolean, // مزايا اضافية غرفة خدم
  ac: boolean, // مزايا اضافية مكيفة
  furnished: boolean, // مزايا اضافية مؤثثة
  kitchen: boolean, // مزايا اضافية مطبخ راكب
  garage: boolean,
  car_entrance: boolean
}
interface imageInter {
  id: number;
  images?: File[];
}
export const postrealEstateType = createAsyncThunk<
  returnType,
  RealEstateTypeInter
>("RealEstateType", async (data: RealEstateTypeInter, { rejectWithValue }) => {
  let images = data?.images;
  if (data?.images) {
    delete data["images"];
  }
  const response = await axios
    .post("https://server.mashrook.sa/property/offer", data, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
    .then(async (response) => {
      // postImageRealEstate(response.data)
      const res = await imageRequest({
        id: response?.data?.data?.id,
        images: images,
      });
      return response.data;
    })
    .catch((error) => error?.response?.data);

  return response;
});
export const imageRequest = async (data: imageInter) => {
  const formData = new FormData();
  data?.images?.forEach((image) => formData.append("images", image));

  const response = await axios
    .post(`https://server.mashrook.sa/property-media/${data.id}`, formData, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((error) => error?.response?.data);
  return response;
};
const initialstate = {
  loading: false,
  message: "",
  data: null,
};

const realEstateTypeSlice = createSlice({
  name: "realEstateType",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postrealEstateType.fulfilled, (state, action) => {
      
      state.loading = false;
      state.message = action.payload.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(postrealEstateType.pending, (state, action) => {
        state.loading = true;
        state.message = "pending...";
        state.data = null;
      }),
      builder.addCase(postrealEstateType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      });
  },
});
export default realEstateTypeSlice.reducer;

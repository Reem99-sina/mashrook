import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookie from "js-cookie";
import {
  returnRealState,
  landDetailPutINfo,
  locationInfo,
  realEstatePartner,
  detailsType,
} from "@/type/addrealestate";
export interface returnType {
  loading: boolean;
  message: string | undefined;
  data: returnRealState | null;
}
export interface typeInput {
  property_owner_type_id?: number; // وسيط عقاري, مطور عقاري, وسيط
  property_purpose_id?: number; //بيع, تطوير (شراكة برأس المال أو البناء)
  property_type_id?: number;
  partner_type_id?: number;
  city?: string;
  district?: string;
  lat?: number;
  long?: number;
  address?: string;
  area?: string;
  price?: number | string;
  is_divisible?: boolean; //
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
  area?: number;
  price?: number | string;
  is_divisible?: boolean; // قي حالة اختيار ارض  (هل العقار قابل للتجزئية)
  advertisement_number?: string; // رقم الاعلان
  license_number?: string; // رقم الرخصة في حالة اختيار وسيط عقاري او مطور عقاري
  partner_type_id?: number; /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلا))
  age?: number; //  في حالة الفيلا العمر
  location?: string; // في حالة الفيلا دور أرضي, دور علوي ,شقة
  apartment_number?: string | number | undefined; // في حالة الشقة رقم الشقة
  apartment_floor?: string; // في حالة الشقة رقم الدور
  rooms_number?: number; // في حالة الفيلا عدد الغرف
  halls_number?: number; // في حالة الفيلا عدد الصالات
  bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
  kitchens_number?: number; // في حالة الفيلا عدد المطابخ
  pool?: boolean; // مزايا اضافية مسبح
  garden?: boolean; // مزايا اضافية
  servants_room?: boolean; // مزايا اضافية غرفة خدم
  ac?: boolean; // مزايا اضافية مكيفة
  garage?: boolean;
  furnished?: boolean; // مزايا اضافية مؤثثة
  kitchen?: boolean; // مزايا اضافية مطبخ راكب
  partnership_amount?: number; // في حالة الاستثمار
  images?: File[];
  status?: string;
  apartment?: {
    area?: number | string;
    price?: number | string;
    rooms_number?: number; // في حالة الفيلا عدد الغرف
    halls_number?: number; // في حالة الفيلا عدد الصالات
    bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
    kitchens_number?: number;
  };
  propertyDetailsOwnership?: realEstatePartner[];
  propertyPurpose?: detailsType;
  finance?: boolean;
  alternativeCount?: number;
  landDetails?: {
    id?: number;
    area?: number;
    price?: number;
    min_price?: null | number;
    is_divisible?: boolean;
    piece_number?: string;
    plan_number?: string;
    type?: null | string;
    createdAt?: string;
    updatedAt?: string;
    property_id?: number;
    status?: string;
  }[];
  createdAt?: string;
  id?: string;
  details?: earthInter[];
  propertyTypeDetails?: {
    id?: number;
    title?: string;
  };
  propertyLocation?: {
    city?: string;
    district?: string;
    address?: string;
    lat?: number;
    long?: number;
  };
  propertyType?: {
    id?: number;
    title?: string;
  };
  propertyOwnerType?: detailsType;
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
  garage?: boolean;
  plan_number?: string; // في حالة اختيار ارض (رقم المخطط)
  piece_number?: string; // في حالة اختيار ارض (رقم القطعة)
  area?: string;
  price?: string;
  is_divisible?: boolean; // قي حالة اختيار ارض  (هل العقار قابل للتجزئية)
  advertisement_number?: string; // رقم الاعلان
  license_number?: string; // رقم الرخصة في حالة اختيار وسيط عقاري او مطور عقاري
  partner_type_id?: string; /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلstring; /// في حالة الفيلا (فيلا ( درج داخلي + شقة)او فيلا (وحدات تمليك)) :::::: في حالة الدور (دور أرضي و دور علوي) :::::  في حالة شقة (شقة (داخل عمارة سكنية)و شقة (داخل فيلا))
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
  status?: string;
  "apartment.area"?: string;
  "apartment.price"?: string;
  "apartment.rooms_number"?: string;
  "apartment.halls_number"?: string;
  "apartment.bathrooms_number"?: string;
  "apartment.kitchens_number"?: string;
  details?: earthInter[];
  apartment?: {
    area?: number | string;
    price?: number | string;
    rooms_number?: number; // في حالة الفيلا عدد الغرف
    halls_number?: number; // في حالة الفيلا عدد الصالات
    bathrooms_number?: number; // في حالة الفيلا عدد دورات المياه
    kitchens_number?: number;
  };
  landDetails?: {
    area?: number | string;
    price?: number | string;
    piece_number?: string;
    plan_number?: string;
    stage: string;
    available_percentage: number;
    available_price: number;
  }[];
  [key: string]: any;
}
export interface earthInter {
  id?: number;
  type: string;
  area: number;
  price: number;
  stage: string;
  available_percentage: number;
  available_price: number;
  apartment_number?: string | number | undefined;
  rooms_number: number; // في حالة الفيلا عدد الغرف
  halls_number: number; // في حالة الفيلا عدد الصالات
  bathrooms_number: number; // في حالة الفيلا عدد دورات المياه
  kitchens_number: number; // في حالة الفيلا عدد المطابخ
  pool: boolean; // مزايا اضافية مسبح
  garden: boolean; // مزايا اضافية
  servants_room: boolean; // مزايا اضافية غرفة خدم
  ac: boolean; // مزايا اضافية مكيفة
  furnished: boolean; // مزايا اضافية مؤثثة
  kitchen: boolean; // مزايا اضافية مطبخ راكب
  garage: boolean;
  car_entrance: boolean;
  status?: string;
  min_price?: number;
  createdAt?: string;
  updatedAt?: string;
  property_id?: number;
  amenities?: {
    pool?: boolean; // مزايا اضافية مسبح
    garden?: boolean; // مزايا اضافية
    servants_room?: boolean; // مزايا اضافية غرفة خدم
    ac?: boolean; // مزايا اضافية مكيفة
    furnished?: boolean; // مزايا اضافية مؤثثة
    kitchen?: boolean; // مزايا اضافية مطبخ راكب
    garage?: boolean;
    car_entrance?: boolean;
  };
}
interface imageInter {
  id: number;
  images: File[];
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
        Authorization: Cookie.get("token"),
      },
    })
    .then(async (response) => {
      // postImageRealEstate(response.data)
      if (images && images?.length > 0) {
        const res = await imageRequest({
          id: response?.data?.data?.id,
          images: images,
        });
      }

      return response.data;
    })
    .catch((error) => error?.response?.data);

  return response;
});
export const putLandDetailsType = createAsyncThunk<returnType, any>(
  "land-details/put",
  async (data: any, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/property/land-details", data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then(async (response) => {
        // postImageRealEstate(response.data)

        return response.data;
      })
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const putDetailsType = createAsyncThunk<returnType, any>(
  "details/put",
  async (data: any, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/property/details", data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then(async (response) => {
        // postImageRealEstate(response.data)

        return response.data;
      })
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const putLocation = createAsyncThunk<returnType, any>(
  "location/put",
  async (data: any, { rejectWithValue }) => {
    const response = await axios
      .put("https://server.mashrook.sa/property/location", data, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then(async (response) => {
        // postImageRealEstate(response.data)

        return response.data;
      })
      .catch((error) => error?.response?.data);

    return response;
  }
);
export const imageRequest = async (data: imageInter) => {
  const formData = new FormData();
  data?.images?.forEach((image) => formData.append("images", image));
  const response = await axios
    .post(`https://server.mashrook.sa/property-media/${data.id}`, formData, {
      headers: {
        Authorization: Cookie.get("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((error) => error?.response?.data);
  return response;
};
export const imageDeleteRequest = createAsyncThunk<returnType, any>(
  "image/delete",
  async (data: imageInter) => {
    const response = await axios
      .delete(`https://server.mashrook.sa/property-media/${data?.id}`, {
        headers: {
          Authorization: Cookie.get("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error?.response?.data);
    return response;
  }
);
export const imageUpdateRequest = createAsyncThunk<returnType, any>(
  "image/update",
  async (data: any) => {
    const formData = new FormData();
    formData.append("image", data?.images);

    const response = await axios
      .post(
        `https://server.mashrook.sa/property-media/upload-single/${data?.id}`,
        formData,
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
);
interface IntitalState {
  loading: boolean;
  message: string | undefined;
  data: returnRealState | null;
  dataPut: landDetailPutINfo | null;
  messagePut: string | undefined;
  dataPutLocat: locationInfo | null;
  messagePutLocat: string | undefined;
  dataPutDetail: any | null;
  messagePutDetail: string | undefined;
  messageDeleteImage: string | undefined;
  messageUpdateImage: string | undefined;
}
const initialstate: IntitalState = {
  loading: false,
  message: "",
  data: null,
  dataPut: null,
  messagePut: "",
  dataPutLocat: null,
  messagePutLocat: "",
  dataPutDetail: null,
  messagePutDetail: "",
  messageDeleteImage: "",
  messageUpdateImage: "",
};

const realEstateTypeSlice = createSlice({
  name: "realEstateType",
  initialState: initialstate,
  reducers: {
    removeState: (state) => {
      (state.loading = false), (state.message = ""), (state.data = null);
    },
    removeStateEdit: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postrealEstateType.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message
        ? action.payload.message
        : "success";
      state.data = action.payload.data;
    }),
      builder.addCase(postrealEstateType.pending, (state, action) => {
        state.loading = true;
        state.message = "";
        state.data = null;
      }),
      builder.addCase(postrealEstateType.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ? action.error.message : "error";
        state.data = null;
      }),
      builder.addCase(putLandDetailsType.fulfilled, (state, action) => {
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(putLandDetailsType.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(putLocation.fulfilled, (state, action) => {
        state.message = "";
      }),
      builder.addCase(putLocation.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(putDetailsType.fulfilled, (state, action) => {
        state.message = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(putDetailsType.rejected, (state, action) => {
        state.message = action.error.message ? action.error.message : "error";
      }),
      builder.addCase(imageDeleteRequest.fulfilled, (state, action) => {
        state.messageDeleteImage = action?.payload?.message
          ? action.payload.message
          : "success";
      }),
      builder.addCase(imageDeleteRequest.rejected, (state, action) => {
        state.messageDeleteImage = action?.error?.message
          ? action.error.message
          : "error";
      }),
      builder.addCase(imageUpdateRequest?.fulfilled, (state, action) => {
        state.messageUpdateImage = action?.payload?.message
          ? action.payload.message
          : "success";
      });
  },
});
export const { removeState, removeStateEdit } = realEstateTypeSlice.actions;
export default realEstateTypeSlice.reducer;

import { dataReturn } from "@/redux/features/getRequest";
export const steps = [
  {
    label: "قيد الانتظار",
    data: "pending",
  },
  {
    label: "انضمام الشركاء",
    data: "active",
  },
  {
    label: "السعي",
    data: "inprogress",
  },
  {
    label: "الافراغ",
    data: "waiting",
  },
  {
    label: "منتهية",
    data: "inactive",
  },
  {
    label: "موقوفة",
    data: "suspended",
  },
];
export const PartnerStage = [
  {
    label: "في انتظار البدء",
    data: "waiting_for_employee",
    color: "#1E429F",
  },
  {
    label: "قيد الانتظار",
    data: "pending",
    color: "#FDF6B2",
  },
  {
    label: "انضمام الشركاء",
    data: "active",
    color: "#E3A008",
  },
  {
    label: "السعي",
    data: "inprogress",
    color: "#544F9E",
  },
  {
    label: "الافراغ",
    data: "waiting",
    color: "#EF401E",
  },
  {
    label: "الاتفاق",
    data: "agreement",
    color: "#03543F",
  },
  {
    label: "العمولة",
    data: "commission",
    color: "#03543F",
  },
  {
    label: "التوثيق",
    data: "documented",
    color: "#03543F",
  },
  {
    label: "مكتملة",
    data: "finished",
    color: "#03543F",
  },
  {
    label: "منتهية",
    data: "inactive",
    color: "#9B1C1C",
  },
  {
    label: "موقوفة",
    data: "suspended",
    color: "#9B1C1C",
  },
  {
    label: "مرفوضة",
    data: "rejected",
    color: "#9B1C1C",
  },
];
export const PartnerOwnStage = [
  {
    label: "انضمام الشركاء",
    data: "active",
    color: "#E3A008",
  },
  {
    label: "السعي",
    data: "inprogress",
    color: "#544F9E",
  },
  {
    label: "الافراغ",
    data: "waiting",
    color: "#EF401E",
  },
  {
    label: "منتهية",
    data: "inactive",
    color: "#9B1C1C",
  },
];

export const PartnerDeveloperStage = [
  {
    label: "انضمام الشركاء",
    data: "active",
    color: "#E3A008",
  },
  {
    label: "دفع رسوم",
    data: "pay_fees",
    color: "#544F9E",
  },
  {
    label: "السعي",
    data: "inprogress",
    color: "#544F9E",
  },

  {
    label: "الافراغ",
    data: "waiting",
    color: "#EF401E",
  },
  {
    label: "منتهية",
    data: "inactive",
    color: "#9B1C1C",
  },
];
export const PartnerDeveloperNoSellStage = [
  {
    label: "انضمام الشركاء",
    data: "active",
    color: "#E3A008",
  },
  {
    label: "الاتفاق",
    data: "agreement",
    color: "#03543F",
  },
  {
    label: "العمولة",
    data: "commission",
    color: "#03543F",
  },

  {
    label: "التوثيق",
    data: "documented",
    color: "#03543F",
  },
  {
    label: "منتهية",
    data: "inactive",
    color: "#9B1C1C",
  },
];
export interface detailsType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface detailsMoreType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  property_type_id: number;
}
export interface saveElement {
  id: number;
  createdAt: string;
  updatedAt: string;
  property_id: number;
  user_id: number;
}
export interface dataTypeOfRealEstate {
  title?: string;
  details?: detailsType[];
  data: detailsType[];
}

export interface cityDetial {
  id: string;
  nameAr: string;
  nameEn: string;
}
export interface districtDetail {
  id: number;
  city_name: string;
  name: string;
}
export interface properityLocationInfo {
  id: number;
  lat: number;
  long: number;
  address: string;
  city: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  property_id: number;
}
export interface roomType {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  details_id: number | null;
  land_details_id: null | number;
  last_message_id: number;
  property_id: number;
  sender_id: number;
  receiver_id: number;
  blocker_id: null | number;
}
export interface landInfo {
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
}
export interface detailOneInfo {
  id?: number;
  area: number;
  price: number;
  min_price?: number;
  rooms_number: number;
  halls_number: number;
  bathrooms_number: number;
  kitchens_number: number;
  age?: number;
  status?: string | null;
  location?: string;
  apartment_number?: string | number;
  apartment_floor?: string;
  min_apartment_floor?: string | null;
  createdAt?: string;
  updatedAt?: string;
  property_id?: number;
  type: string;
  amenities?: amenitiesInfo;
}
export interface amenitiesInfo {
  id?: number;
  pool?: boolean;
  garden?: boolean;
  servants_room?: boolean;
  ac?: boolean;
  furnished?: boolean;
  kitchen?: boolean;
  car_entrance?: boolean;
  garage?: boolean;
  createdAt?: string;
  updatedAt?: string;
  property_id?: number;
}
export interface userInfo {
  id: number;
  username: string;
  email: string;
  image: null | string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
  val_license: null;
}
export interface CriteriaInter {
  dealStatus: boolean | string;
  city: string;
  district: string | null;
  unitType: number | string;
  unitStatus: string;
  priceRange: number[];
  shareRange: number[];
  desiredRow: number[];
  floorType: string;
}
//  "id": 6,
// "username": "reem",
// "email": "reemsina2@gmail.com",
// "phone": "+966222555888",
// "val_license": null,
// "image": null,
// "status": "active",
// "userType": "user",
// "createdAt": "2024-09-09T14:30:58.000Z",
// "updatedAt": "2024-09-09T14:31:52.000Z"
export interface returnRealState {
  id: number;
  type: string;
  license_number: string;
  advertisement_number: string;
  partnership_amount: number;
  finance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  partner_type_id: number;
  user_id: number;
  property_type_id: number;
  property_owner_type_id: number;
  property_purpose_id: number;
  property_type_details_id: number;
  propertyLocation: properityLocationInfo;
  amenities: amenitiesInfo[];
  user: userInfo;
  propertyType: detailsType;
  partnerType: detailsType;
  propertyTypeDetails: detailsMoreType;
}
export interface realEstatePartner {
  percentage: number;
  amount: number;
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  partner_type_id: number;
  details_id: number | null;
  land_details_id: number | null;
  user_id: number;
  property_id: number;
  landDetails: (landInfo & { room: roomType[] }) | null;
  details: (detailOneInfo & { room: roomType[] }) | null;
  property: returnRealState & {
    propertyPurpose: detailsType;
    propertyOwnerType: detailsType;
  };
}
export interface imageInfo {
  name: string;
  link: string | ArrayBuffer | null;
}
export interface DataSendInfo {
  property_owner_type_id: number;
  property_purpose_id: number;
  property_type_id: number;
  partner_type_id: number;
  city: string;
  district: string;
  address: string;
  area: number;
  price: number;
  lat: number;
  long: number;
  is_divisible: boolean;
}
export interface landDetailPutINfo {
  id: number;
  type: string;
  license_number: string;
  advertisement_number: string;
  partnership_amount: number;
  finance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  partner_type_id: number;
  user_id: number;
  property_type_id: number;
  property_owner_type_id: number;
  property_purpose_id: number;
  property_type_details_id: number;
  propertyLocation: properityLocationInfo;
  landDetails?: landInfo[] | null;
}
export interface locationInfo {
  id: number;
  type: string;
  license_number: string;
  advertisement_number: string;
  partnership_amount: number;
  finance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  partner_type_id: number;
  user_id: number;
  property_type_id: number;
  property_owner_type_id: number;
  property_purpose_id: number;
  property_type_details_id: number;
  propertyLocation: properityLocationInfo;
}
export interface initialOffer {
  loading: boolean;
  message: string;
  data: dataReturn[] | null;
  selectData: dataReturn | null;
  messageReport: string;
  status: number;
}
export interface partnerInterface {
  id: number;
  percentage: number;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  details_id: number | null;
  land_details_id: number | null;
  property_id: number;
  user_id: number;
  landDetails: null | landInfo;
  details: null | detailOneInfo;
  // property:
}
export interface RequestInfo {
  message?: string;
  data?: any;
  status?: number;
}
export interface propertyAdvertisingItemsinterface {
  id: number;
  type: string;
  name: string;
  phone: string;
  title: string;
  details: string;
  user_id: null | number;
  updatedAt: string;
  createdAt: string;
}
export interface propertyAdvertiseinterface {
  id: number;
  status: string;
  updatedAt: string;
  createdAt: string;
}
export interface dataReturnType {
  id: number;
  type: string;
  is_divisible?: boolean;
  age?: number;
  license_number: string;
  area: number;
  price: number;
  min_price: string | null;
  advertisement_number: string;
  partnership_amount: any;
  finance: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  property_type_id: number;
  property_owner_type_id: number;
  property_purpose_id: number;
  propertyLocation: {
    id: number;
    lat: number;
    long: number;
    address: string;
    city: string;
    district: string;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  };
  landDetails: {
    id: number;
    is_divisible: boolean;
    piece_number: string;
    plan_number: string;
    type: string | null;
    createdAt: string;
    updatedAt: string;
    property_id: number;
    area: number;
    price: number;
    stage: string;
    available_percentage: number;
    available_price: number;
  }[];
  details: ({
    id: number;
    type: string;
    area: number;
    price: number;
    rooms_number: number;
    halls_number: number;
    bathrooms_number: number;
    kitchens_number: number;
    stage: string;
    available_percentage: number;
    available_price: number;
    age: number;
    status: any;
    location: any;
    apartment_number: any;
    apartment_floor: any;
    min_apartment_floor: any;
    createdAt: string;
    updatedAt: string;
    property_id: number;
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
  } & landInfo)[];
  amenities: any[];
  user: userInfo;
  propertyType: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyPurpose: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyOwnerType: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyTypeDetails: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  propertyMedia: {
    id: number;
    name: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    property_id: number;
  }[];
  propertySaved?: saveElement[];
  propertyDetailsOwnership?: realEstatePartner[];
  propertyAdvertising?: propertyAdvertiseinterface[];
}
export interface Banners {
  id: number;
  status: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}
export interface bannerinfo {
  loading: boolean;
  message: string;
  data: Banners[] | null;
}

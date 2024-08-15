import { object, string, number, date, InferType,array,boolean } from 'yup';

export let earthSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id:number().required(" ما نوع العقار ؟"),
  district:string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  plan_number:string().required("ما رقم المخطط ؟"),
  piece_number:string().required("ما رقم المقطعة ؟"),
  area:string().required("مساحة مطلوبة"),
  price: number().required("سعر مطلوب"),
  is_divisible:boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number:string(),
  license_number:string()
});
export let departmentOrRowSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id:number().required(" ما نوع العقار ؟"),
  district:string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  type: string().required("نوع مطلوب"),
  area:string().required("مساحة مطلوبة"),
  price: number().required("سعر مطلوب"),
  is_divisible:boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number:string(),
  license_number:string(),
  age: number().required(" ما عمر العقار ؟"),
  rooms_number: number().required("ما عدد غرف؟"),
  halls_number: number().required("ما عدد صالات؟"),
  bathrooms_number: number().required("ما عدد حمامات؟"),
  kitchens_number: number().required("ما عدد مطابخ؟"),
  ac: boolean().required("هل تريدة  مع مكيفة؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  kitchen: boolean().required("هل تريدة مع مطبخ؟"),
  car_entrance: boolean().required("هل تريدة مع مدخل سيارة؟"),
});
export let departmentOrRowArchSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id:number().required(" ما نوع العقار ؟"),
  district:string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  type: string().required("نوع مطلوب"),
  area:string().required("مساحة مطلوبة"),
  price: number().required("سعر مطلوب"),
  apartment_number:string().required(" ما رقم شقة ؟"),// في حالة الشقة رقم الشقة
  apartment_floor:string().required(" ما رقم  دور ؟"),
  is_divisible:boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number:string(),
  license_number:string(),
  age: number().required(" ما عمر العقار ؟"),
  rooms_number: number().required("ما عدد غرف؟"),
  halls_number: number().required("ما عدد صالات؟"),
  bathrooms_number: number().required("ما عدد حمامات؟"),
  kitchens_number: number().required("ما عدد مطابخ؟"),
  ac: boolean().required("هل تريدة  مع مكيفة؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  kitchen: boolean().required("هل تريدة مع مطبخ؟"),
  car_entrance: boolean().required("هل تريدة مع مدخل سيارة؟"),
});

export let villaOwnSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id:number().required(" ما نوع العقار ؟"),
  district:string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  type: string().required("نوع مطلوب"),
  area:string().required("مساحة مطلوبة"),
  location:string().required("اي دور مطلوبة"),

  price: number().required("سعر مطلوب"),
  is_divisible:boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number:string(),
  license_number:string(),
  age: number().required(" ما عمر العقار ؟"),
  rooms_number: number().required("ما عدد غرف؟"),
  halls_number: number().required("ما عدد صالات؟"),
  bathrooms_number: number().required("ما عدد حمامات؟"),
  kitchens_number: number().required("ما عدد مطابخ؟"),
  ac: boolean().required("هل تريدة  مع مكيفة؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  kitchen: boolean().required("هل تريدة مع مطبخ؟"),
  car_entrance: boolean().required("هل تريدة مع مدخل سيارة؟"),
});
// export let earthSchema = object().shape({
//     type: string().required("نوع دور مطلوب"),
//     city: string().required(" مدينة مطلوب"),

//     district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),

//     status:string(),
//     price: number().required("سعر مطلوب"),
//     min_price: number().required("حد الادني للسعر مطلوب"),
//     finance:string().required("هل ترغب في تمويل عقاري؟"),
//     property_type_id:number().required("حدد نوع العقار")
//   });
// export let departmentOwnSchema = object().shape({
//     type: string().required("نوع شقة مطلوب"),
//     city: string().required(" مدينة مطلوب"),

//     district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),

//     status:string().required("حالة العقار مطلوب"),
//     price: number().required("سعر مطلوب"),
//     min_price: number().required("حد الادني للسعر مطلوب"),
//     finance:string().required("هل ترغب في تمويل عقاري؟"),
//      min_apartment_floor:string().required("حدد اقصي دور ") , // الادوار الامرغوبة
//     apartment_floor: string().required("حدد  دور ") ,
//     property_type_id:number().required("حدد نوع العقار")
//   });
//   export let departmentSchema = object().shape({
//     type: string().required("نوع شقة مطلوب"),
//     city: string().required(" مدينة مطلوب"),

//     district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),

//     status:string().required("حالة العقار مطلوب"),
//     price: number().required("سعر مطلوب"),
//     min_price: number().required("حد الادني للسعر مطلوب"),
//     finance:string().required("هل ترغب في تمويل عقاري؟"),
//      min_apartment_floor:string() , // الادوار الامرغوبة
//     apartment_floor: string(),
//     property_type_id:number().required("حدد نوع العقار")
//   });

//   export let villaOwnSchema = object().shape({
//     type: string().required("نوع شقة مطلوب"),
//     city: string().required(" مدينة مطلوب"),
//     district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
//     status:string().required("حالة العقار مطلوب"),
//     price: number().required("سعر مطلوب"),
//     min_price: number().required("حد الادني للسعر مطلوب"),
//     finance:string().required("هل ترغب في تمويل عقاري؟"),
//     min_apartment_floor:string() , // الادوار الامرغوبة
//     apartment_floor: string().required("حدد  دور "),
//     property_type_id:number().required("حدد نوع العقار")
//   });
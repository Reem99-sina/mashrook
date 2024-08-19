import { object, string, number, date, InferType, array, boolean } from "yup";

export let earthSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id: number().required(" ما نوع العقار ؟"),
  images: array().min(1, " مطلوب اضافة صوره").required(" مطلوب اضافة صوره"),
  address:string().required("عنوان مطلوب"),
  lat:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  long:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  district: string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  is_divisible: boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number: string(),
  license_number: string(),
  landDetails: array()
    .of(
      object().shape({
        plan_number: string().required("ما رقم المخطط ؟"),
        piece_number: string().required("ما رقم المقطعة ؟"),
        area: number().required("مساحة مطلوبة"),
        price: number().notOneOf([0], "سعر مطلوب").required("سعر مطلوب"),
      })
    )
    .min(1, "معلومات الارض مطلوبة"),
});
export let earthDevSchema = object().shape({
  advertisement_number: string().required("ما رقم الاعلان؟"),
  license_number: string().required("ما رقم الرخصة"),
});
export let departmentOrRowSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id: number().required(" ما نوع العقار ؟"),
  district: string().required("حي مطلوب"),
  address:string().required("عنوان مطلوب"),
  lat:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  long:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  city: string().required(" مدينة مطلوب"),
  area: number().notOneOf([0], "مساحة مطلوبة").required("مساحة مطلوبة"),
  images: array().min(1, " مطلوب اضافة صوره").required(" مطلوب اضافة صوره"),
  price: number().notOneOf([0], "سعر مطلوب").required("سعر مطلوب"),
  is_divisible: boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number: string(),
  license_number: string(),
  age: number().notOneOf([0], "ما عمر العقار ؟").required(" ما عمر العقار ؟"),
  rooms_number: number().notOneOf([0], "ما عدد غرف؟").required("ما عدد غرف؟"),
  halls_number: number()
    .notOneOf([0], "ما عدد صالات؟")
    .required("ما عدد صالات؟"),
  bathrooms_number: number()
    .notOneOf([0], "ما عدد حمامات؟")
    .required("ما عدد حمامات؟"),
  kitchens_number: number()
    .notOneOf([0], "ما عدد مطابخ؟")
    .required("ما عدد مطابخ؟"),
  ac: boolean().required("هل تريدة  مع مكيفة؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  kitchen: boolean().required("هل تريدة مع مطبخ؟"),
  car_entrance: boolean().required("هل تريدة مع مدخل سيارة؟"),
});
export let departmentOrRowArchSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id: number().required(" ما نوع العقار ؟"),
  district: string().required("حي مطلوب"),
  images: array().min(1, " مطلوب اضافة صوره").required(" مطلوب اضافة صوره"),
  address:string().required("عنوان مطلوب"),
  lat:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  long:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  city: string().required(" مدينة مطلوب"),
  area: number().required("مساحة مطلوبة"),
  apartment_number: string().notOneOf(["0"], " ما رقم شقة ؟").required(" ما رقم شقة ؟"), // في حالة الشقة رقم الشقة
  apartment_floor: string().notOneOf(["0"], "ما رقم  دور ؟").required(" ما رقم  دور ؟"),
  price: number().notOneOf([0], "سعر مطلوب").required("سعر مطلوب"),
  is_divisible: boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number: string(),
  license_number: string(),
  age: number().notOneOf([0], "ما عمر العقار ؟").required(" ما عمر العقار ؟"),
  rooms_number: number().notOneOf([0], "ما عدد غرف؟").required("ما عدد غرف؟"),
  halls_number: number()
    .notOneOf([0], "ما عدد صالات؟")
    .required("ما عدد صالات؟"),
  bathrooms_number: number()
    .notOneOf([0], "ما عدد حمامات؟")
    .required("ما عدد حمامات؟"),
  kitchens_number: number()
    .notOneOf([0], "ما عدد مطابخ؟")
    .required("ما عدد مطابخ؟"),
  ac: boolean().required("هل تريدة  مع مكيفة؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  kitchen: boolean().required("هل تريدة مع مطبخ؟"),
  car_entrance: boolean().required("هل تريدة مع مدخل سيارة؟"),
});
export let departmentWithVillaSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id: number().required(" ما نوع العقار ؟"),
  district: string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  images: array().min(1, " مطلوب اضافة صوره").required(" مطلوب اضافة صوره"),
  address:string().required("عنوان مطلوب"),
  lat:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  long:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  area: number().required("مساحة مطلوبة"),
  price: number().notOneOf([0], "سعر مطلوب").required("سعر مطلوب"),
  is_divisible: boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number: string(),
  license_number: string(),
  age: number().notOneOf([0], "ما عمر العقار ؟").required(" ما عمر العقار ؟"),
  rooms_number: number().notOneOf([0], "ما عدد غرف؟").required("ما عدد غرف؟"),
  halls_number: number()
    .notOneOf([0], "ما عدد صالات؟")
    .required("ما عدد صالات؟"),
  bathrooms_number: number()
    .notOneOf([0], "ما عدد حمامات؟")
    .required("ما عدد حمامات؟"),
  kitchens_number: number()
    .notOneOf([0], "ما عدد مطابخ؟")
    .required("ما عدد مطابخ؟"),
  pool: boolean().required("هل تريدة مسبح؟"), // مزايا اضافية مكيفة
  furnished: boolean().required("هل تريدة مع مؤثثة؟"), // مزايا اضافية مؤثثة
  servants_room: boolean().required("هل تريدة مع غرف الخدم؟"),
  garage: boolean().required("هل تريدة مع كراج سيارة؟"),
  apartment: object().shape({
    area: number().notOneOf([0], "سعر مطلوب").required("مساحة مطلوبة"),
    price: number().notOneOf([0], "سعر مطلوب").required("سعر مطلوب"),
    rooms_number: number().notOneOf([0], "ما عدد غرف؟").required("ما عدد غرف؟"),
    halls_number: number()
      .notOneOf([0], "ما عدد صالات؟")
      .required("ما عدد صالات؟"),
    bathrooms_number: number()
      .notOneOf([0], "ما عدد حمامات؟")
      .required("ما عدد حمامات؟"),
    kitchens_number: number()
      .notOneOf([0], "ما عدد مطابخ؟")
      .required("ما عدد مطابخ؟"),
  }),
});

export let villaOwnSchema = object().shape({
  property_owner_type_id: number().required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number().required(" ما الغرض ؟"),
  property_type_id: number().required(" ما نوع العقار ؟"),
  property_type_details_id: number().required(" ما نوع العقار ؟"),
  images: array().min(1, " مطلوب اضافة صوره").required(" مطلوب اضافة صوره"),
  address:string().required("عنوان مطلوب"),
  lat:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  long:number().notOneOf([0], "احداثيات مكان مطلوبة").required("احداثيات مكان مطلوبة"),
  district: string().required("حي مطلوب"),
  city: string().required(" مدينة مطلوب"),
  is_divisible: boolean().required("هل العقار قابل للتجزئة؟"),
  advertisement_number: string(),
  license_number: string(),
  age: number().notOneOf([0], "ما عمر العقار ؟").required(" ما عمر العقار ؟"),
  details: array().min(1, "مطلوب اضافت نفاصيل الادوار").required("مطلوب اضافت نفاصيل الادوار").of(
    object().shape({
      type: string(),
      area: number().notOneOf([0], "ما  مساحة ؟").required(" ما  مساحة ؟"),
      price: number().notOneOf([0], "ما  الشعر ؟").required(" ما  السعر ؟"),
      rooms_number: number().notOneOf([0], "ما عدد غرف؟").required("ما عدد غرف؟"), // في حالة الفيلا عدد الغرف
      halls_number: number().notOneOf([0], "ما عدد صالات؟")
      .required("ما عدد صالات؟"), // في حالة الفيلا عدد الصالات
      bathrooms_number: number().notOneOf([0], "ما عدد حمامات؟")
      .required("ما عدد حمامات؟"), // في حالة الفيلا عدد دورات المياه
      kitchens_number: number().notOneOf([0], "ما عدد مطابخ؟")
      .required("ما عدد مطابخ؟"), // في حالة الفيلا عدد المطابخ
      pool: boolean(), // مزايا اضافية مسبح
      garden: boolean(), // مزايا اضافية
      servants_room: boolean(), // مزايا اضافية غرفة خدم
      ac: boolean(), // مزايا اضافية مكيفة
      furnished: boolean(), // مزايا اضافية مؤثثة
      kitchen: boolean(), // مزايا اضافية مطبخ راكب
      garage: boolean(),
      car_entrance: boolean(),
    })
  ),
});

export let schemaMain = object().shape({
  property_owner_type_id: number()
    .notOneOf([0], "ما صفة مقدم الغرض؟")
    .required(" ما صفة مقدم الغرض؟ "),
  property_purpose_id: number()
    .notOneOf([0], "ما الغرض ؟")
    .required(" ما الغرض ؟"),
  property_type_id: number()
    .notOneOf([0], "ما نوع العقار ؟")
    .required(" ما نوع العقار ؟"),
});
export let partnerSchema = object().shape({
  partner_type_id: number().notOneOf([0], "نوع مطلوب").required("نوع مطلوب"),
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

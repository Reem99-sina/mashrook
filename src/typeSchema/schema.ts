import { object, string, number, date, InferType, array, boolean } from "yup";
export const cites: { id: number; name: string }[] = [
  { id: 1, name: "حي النرجس" },
  { id: 2, name: "حي العليا" },
  { id: 3, name: "حي المروج" },
  { id: 4, name: "حي العارض" },
  { id: 5, name: "حي الصحافة" },
  { id: 6, name: "حي الندى" },
  {
    id: 7,
    name: "حي الندى ",
  },
  {
    id: 8,
    name: "حي النرجس",
  },
  {
    id: 9,
    name: "حي العليا",
  },
  {
    id: 10,
    name: "حي المروج",
  },
  {
    id: 11,
    name: "حي العارض",
  },
  {
    id: 12,
    name: "حي الصحافة ",
  },
  {
    id: 13,
    name: "حي الندى ",
  },
];
export let rowSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع دور مطلوب")
    .required("نوع دور مطلوب"),
  city: string().required(" مدينة مطلوب"),

  district: array()
    .of(string().required())
    .min(1, "حي مطلوب")
    .required("حي مطلوب"),

  status: string().required("حالة العقار مطلوب"),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  property_type_id: number().required("حدد نوع العقار"),
});
export let earthSchema = object().shape({
  // property_type_details_id: number().required("نوع دور مطلوب"),
  city: string().required(" مدينة مطلوب"),

  district: array()
    .of(string().required())
    .min(1, "حي مطلوب")
    .required("حي مطلوب"),

  status: string(),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  property_type_id: number().required("حدد نوع العقار"),
});
export let departmentOwnSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع شقة مطلوب")
    .required("نوع شقة مطلوب"),

  city: string().required(" مدينة مطلوب"),

  district: array()
    .of(string().required())
    .min(1, "حي مطلوب")
    .required("حي مطلوب"),

  status: string().required("حالة العقار مطلوب"),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  min_apartment_floor: string().required("حدد اقصي دور "), // الادوار الامرغوبة
  apartment_floor: string().required("حدد  دور "),
  property_type_id: number().required("حدد نوع العقار"),
});
export let departmentSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع شقة مطلوب")
    .required("نوع شقة مطلوب"),

  city: string().required(" مدينة مطلوب"),

  district: array()
    .of(string().required())
    .min(1, "حي مطلوب")
    .required("حي مطلوب"),

  status: string().required("حالة العقار مطلوب"),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  min_apartment_floor: string(), // الادوار الامرغوبة
  apartment_floor: string(),
  property_type_id: number().required("حدد نوع العقار"),
});

export let villaOwnSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع فيلا مطلوب")
    .required("نوع فيلا مطلوب"),
  details: array()
    .min(1, "مطلوب اضافت نفاصيل الادوار")
    .required("مطلوب اضافت نفاصيل الادوار")
    .of(
      object().shape({
        type: string().required(" نوع مطلوب"),
        price: number().required("سعر مطلوب"),
        min_price: number().required("حد الادني للسعر مطلوب"),
      })
    ),
  city: string().required(" مدينة مطلوب"),
  district: array()
    .of(string().required())
    .min(1, "حي مطلوب")
    .required("حي مطلوب"),
  status: string().required("حالة العقار مطلوب"),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  // min_apartment_floor:string() , // الادوار الامرغوبة
  // apartment_floor: string().required("حدد  دور "),
  property_type_id: number().required("حدد نوع العقار"),
});
export let amountSchema = object().shape({
  amount:number().notOneOf([0], "ادخل مساحة شراكة؟").required("ادخل مساحة شراكة؟")
 });
export let paymentSchema = object().shape({
 method:string().required("ادخل طريقة دفع؟"),
 name:string().required("ادخل اسم ؟"),
 numCard:number().notOneOf([0], "ادخل رقم البطاقة").required("ادخل رقم البطاقة ؟"),
 endDate:string().required("ادخل  تاريخ الانتهاء ؟"),
cvv:string()  
.required('CVV مطلوب') // Ensure CVV is provided  
.matches(/^\d{3,4}$/,"لازم تدخل 3 ارقام او  4 ارقام")
});

import {
  object,
  string,
  number,
  date,
  InferType,
  array,
  boolean,
  ref,
} from "yup";
export const cities = [
  {
    id: 1,
    name: "الرياض",
  },
  {
    id: 2,
    name: "الدمام",
  },
  {
    id: 3,
    name: "جدة",
  },
  {
    id: 4,
    name: "تبوك",
  },
  {
    id: 5,
    name: "الطائف",
  },
];
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
    .notOneOf([0], "نوع الدور مطلوب")
    .required("نوع الدور مطلوب"),
  city: string().required(" هالمدينة مطلوب"),

  district: array()
    .of(string().required())
    .min(1, "الحي مطلوب")
    .required("الحي مطلوب"),

  status: string().required("حالة العقار مطلوبة"),
  price: number().required("السعر مطلوب"),
  min_price: number().required("الحد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  property_type_id: number().required("حدد نوع العقار"),
});
export let earthSchema = object().shape({
  // property_type_details_id: number().required("نوع دور مطلوب"),
  city: string().required(" المدينة مطلوبة"),

  district: array()
    .of(string().required())
    .min(1, "الحي مطلوب")
    .required("الحي مطلوب"),

  status: string(),
  price: number().required("السعر مطلوب"),
  min_price: number().required("الحد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  property_type_id: number().required("حدد نوع العقار"),
});
export let departmentOwnSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع الشقة مطلوب")
    .required("نوع الشقة مطلوب"),

  city: string().required(" المدينة مطلوبة"),

  district: array()
    .of(string().required())
    .min(1, "الحي مطلوب")
    .required("الحي مطلوب"),

  status: string().required("حالة العقار مطلوب"),
  price: number().required("السعر مطلوب"),
  min_price: number().required("الحد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  min_apartment_floor: string().required("حدد اقصي دور "), // الادوار الامرغوبة
  apartment_floor: string().required("حدد  دور "),
  property_type_id: number().required("حدد نوع العقار"),
});
export let departmentSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع شقة مطلوب")
    .required("نوع شقة مطلوب"),

  city: string().required(" المدينة مطلوبة"),

  district: array()
    .of(string().required())
    .min(1, "الحي مطلوب")
    .required("الحس مطلوب"),

  status: string().required("حالة العقار مطلوب"),
  price: number().required("السعر مطلوب"),
  min_price: number().required("الحد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  min_apartment_floor: string(), // الادوار الامرغوبة
  apartment_floor: string(),
  property_type_id: number().required("حدد نوع العقار"),
});

export let villaOwnSchema = object().shape({
  property_type_details_id: number()
    .notOneOf([0], "نوع الفيلا مطلوب")
    .required("نوع الفيلا مطلوب"),
  details: array()
    .min(1, "مطلوب اضافت نفاصيل الادوار")
    .required("مطلوب اضافت نفاصيل الادوار")
    .of(
      object().shape({
        type: string().required("النوع مطلوب"),
        price: number().required("السعر مطلوب"),
        min_price: number().required("الحد الادني للسعر مطلوب"),
      })
    ),
  city: string().required(" المدينة مطلوب"),
  district: array()
    .of(string().required())
    .min(1, "الحي مطلوب")
    .required("حي مطلوب"),
  status: string().required("حالة العقار مطلوب"),
  price: number().required("السعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance: string().required("هل ترغب في تمويل عقاري؟"),
  // min_apartment_floor:string() , // الادوار الامرغوبة
  // apartment_floor: string().required("حدد  دور "),
  property_type_id: number().required("حدد نوع العقار"),
});
export let amountSchema = object().shape({
  amount: number()
    .notOneOf([0], "ادخل مبلغ شراكة؟")
    .required("ادخل مبلغ شراكة؟"),
});
export let paymentSchema = object().shape({
  method: string().required("ادخل طريقة دفع؟"),
  name: string().required("يجب ادخال اسم المستخدم"),
  numCard: number()
    .notOneOf([0], "ادخل رقم البطاقة")
    .required("ادخل رقم البطاقة ؟"),
  endDate: string().required("ادخل  تاريخ الانتهاء ؟"),
  cvv: string()
    .required("CVV مطلوب") // Ensure CVV is provided
    .matches(/^\d{3,4}$/, "يجب ادخال 3 ارقام او  4 ارقام"),
});

export let registerSchema = object().shape({
  username: string().required("ادخل اسم ؟"),
  email: string()
    .email()
    .matches(/^(?!.*@[^,]*,)/, "يجب ادخال البريد الالكتروني صحيح")
    .required("يجب ادخال البريد الالكتروني صحيح"),
  phone: string()
    .matches(
      /^(\+9665)?(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "ادخل رقم الجوال بشكل صحيح"
    )
    .required("ادخل رقم الجوال ؟"),
  password: string()
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("يجب ادخال 8 حروف او ارقام"),
  repeate_password: string()
    .oneOf([ref("password")], "لا يوجد تشابة بينه وبين كلمة السر")
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("لا يوجد تشابة بينه وبين كلمة السر"),
});
export let loginSchema = object().shape({
  email: string()
    .email("يجب ادخال البريد الالكتروني صحيح")
    .matches(/^(?!.*@[^,]*,)/, "يجب ادخال البريد الالكتروني صحيح")
    .required("يجب ادخال البريد الالكتروني صحيح"),
  password: string()
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("يجب ادخال 8 حروف او ارقام"),
});
export let ForgetSchema = object().shape({
  email: string()
    .email("يجب ادخال البريد الالكتروني صحيح")
    .matches(/^(?!.*@[^,]*,)/, "يجب ادخال البريد الالكتروني صحيح")
    .required("يجب ادخال البريد الالكتروني صحيح"),
});
export let UserSchema = object().shape({
  username: string()
    .notOneOf([""], "ادخال اسم المستخدم")
    .required(" ادخال اسم المستخدم"),
});
export let ValNumberSchema = object().shape({
  val_license: string()
    .notOneOf([""], "ادخال رقم رخصة فال")
    .required(" ادخال رقم رخصة فال"),
});
export let ResetSchema = object().shape({
  new_password: string()
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("يجب ادخال 8 حروف او ارقام"),
  repeate_new_password: string()
    .oneOf([ref("new_password")], "لا يوجد تشابة بينه وبين كلمة السر")
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("لا يوجد تشابة بينه وبين كلمة السر"),
});
export let ResetOldNewSchema = object().shape({
  old_password: string()
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("يجب ادخال 8 حروف او ارقام"),
  new_password: string()
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("يجب ادخال 8 حروف او ارقام"),
  repeate_new_password: string()
    .oneOf([ref("new_password")], "لا يوجد تشابة بينه وبين كلمة السر")
    .min(8, "يجب ادخال 8 حروف او ارقام")
    .required("لا يوجد تشابة بينه وبين كلمة السر"),
});
export let ComplaintsSchema = object().shape({
  name: string().required("ادخل اسم ؟"),
  title: string()
    .required("ادخل عنوان الرسالة؟"),
    type: string()
    .required("ادخل غرض المراسلة؟"),
  phone: string()
    .matches(
      /^(\+9665)?(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "ادخل رقم الجوال بشكل صحيح"
    )
    .required("ادخل رقم الجوال ؟"),
  details: string()
  .required("ادخل تفاصيل الرسالة؟")
});
export let NationalIdSchema = object().shape({
  idNumber: string()
    .min(10, "يجب ادخال 10  ارقام")
    .max(10, "يجب ادخال 10  ارقام")
    .required("يجب ادخال 10  ارقام"),
});
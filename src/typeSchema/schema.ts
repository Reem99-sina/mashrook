import { object, string, number, date, InferType,array,boolean } from 'yup';

export let rowSchema = object().shape({
  type: string().required("نوع دور مطلوب"),
  city: string().required(" مدينة مطلوب"),
<<<<<<< HEAD
  district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
=======
  district:array().of(string().required()).required("حي مطلوب"),
>>>>>>> 66f9aaba43def4a5a0879efc1c7be29e2411697b
  status:string().required("حالة العقار مطلوب"),
  price: number().required("سعر مطلوب"),
  min_price: number().required("حد الادني للسعر مطلوب"),
  finance:string().required("هل ترغب في تمويل عقاري؟"),
  property_type_id:number().required("حدد نوع العقار")
});
export let earthSchema = object().shape({
    type: string().required("نوع دور مطلوب"),
    city: string().required(" مدينة مطلوب"),
<<<<<<< HEAD
    district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
=======
    district:array().of(string().required()).required("حي مطلوب"),
>>>>>>> 66f9aaba43def4a5a0879efc1c7be29e2411697b
    status:string(),
    price: number().required("سعر مطلوب"),
    min_price: number().required("حد الادني للسعر مطلوب"),
    finance:string().required("هل ترغب في تمويل عقاري؟"),
    property_type_id:number().required("حدد نوع العقار")
  });
export let departmentOwnSchema = object().shape({
    type: string().required("نوع شقة مطلوب"),
    city: string().required(" مدينة مطلوب"),
<<<<<<< HEAD
    district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
=======
    district:array().of(string().required()).required("حي مطلوب"),
>>>>>>> 66f9aaba43def4a5a0879efc1c7be29e2411697b
    status:string().required("حالة العقار مطلوب"),
    price: number().required("سعر مطلوب"),
    min_price: number().required("حد الادني للسعر مطلوب"),
    finance:string().required("هل ترغب في تمويل عقاري؟"),
     min_apartment_floor:string().required("حدد اقصي دور ") , // الادوار الامرغوبة
    apartment_floor: string().required("حدد  دور ") ,
    property_type_id:number().required("حدد نوع العقار")
  });
  export let departmentSchema = object().shape({
    type: string().required("نوع شقة مطلوب"),
    city: string().required(" مدينة مطلوب"),
<<<<<<< HEAD
    district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
=======
    district:array().of(string().required()).required("حي مطلوب"),
>>>>>>> 66f9aaba43def4a5a0879efc1c7be29e2411697b
    status:string().required("حالة العقار مطلوب"),
    price: number().required("سعر مطلوب"),
    min_price: number().required("حد الادني للسعر مطلوب"),
    finance:string().required("هل ترغب في تمويل عقاري؟"),
     min_apartment_floor:string() , // الادوار الامرغوبة
    apartment_floor: string(),
    property_type_id:number().required("حدد نوع العقار")
  });
<<<<<<< HEAD
  export let villaOwnSchema = object().shape({
    type: string().required("نوع شقة مطلوب"),
    city: string().required(" مدينة مطلوب"),
    district:array().of(string().required()).min(1, "حي مطلوب").required("حي مطلوب"),
    status:string().required("حالة العقار مطلوب"),
    price: number().required("سعر مطلوب"),
    min_price: number().required("حد الادني للسعر مطلوب"),
    finance:string().required("هل ترغب في تمويل عقاري؟"),
    min_apartment_floor:string() , // الادوار الامرغوبة
    apartment_floor: string().required("حدد  دور "),
    property_type_id:number().required("حدد نوع العقار")
  });
=======
>>>>>>> 66f9aaba43def4a5a0879efc1c7be29e2411697b

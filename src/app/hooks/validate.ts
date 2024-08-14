import * as Yup from "yup";

export type ConditionalSchema<T> = T extends string
  ? Yup.StringSchema
  : T extends number
  ? Yup.NumberSchema
  : T extends boolean
  ? Yup.BooleanSchema
  : T extends Record<any, any>
  ? Yup.AnyObjectSchema
  : T extends Array<any>
  ? Yup.ArraySchema<any, any>
  : Yup.AnySchema;

export type Shape<Fields> = {
    [key: string]: any;
};
export async function validateForm<Fields>(formData: { [Key in keyof Fields]: Fields[Key] },schema:Yup.ObjectSchema<Shape<Fields>>,setErrors:(errors: Record<keyof Fields, any>) => void): Promise<boolean> {
        let status=false
        await schema.validate(formData, { abortEarly: false , strict: true }).then(()=>{
            status=true
            
        }).catch(({errors,inner})=>{
            let index=0
            let error={} as any
            while(index<errors.length){
                error[inner[index]?.path]=errors[index]
                index++
            }
            setErrors(error)
            status=false
           
        })
        return status;
}
export interface detailsType{
    id:number,
    title:string,
    createdAt:string,
    updatedAt:string
}
export interface detailsMoreType{
    id:number,
    title:string,
    createdAt:string,
    updatedAt:string,
    property_type_id:number
}
export interface dataTypeOfRealEstate{
    title?:string,
    details?:detailsType[],
    data:detailsType[]
}
export interface cityDetial{

        id: string,
        nameAr: string,
        nameEn: string
        
}
export interface districtDetail{
    
        id: string,
        city_name: string,
        name:string
}
export interface properityLocationInfo{
    id: number,
      lat: number,
      long: number,
      address:string,
      city: string,
      district:string,
      createdAt:string,
      updatedAt:string,
      property_id: number
}
export interface landInfo{
    id: number,
    area: number,
    price: number,
    min_price: null|number,
    is_divisible: boolean,
    piece_number: string,
    plan_number: string,
    type: null|string,
    createdAt: string,
    updatedAt: string,
    property_id: number
}
export interface detailOneInfo{
    id: number,
    area: number,
    price: number,
    min_price: number,
    rooms_number: number,
    halls_number: number,
    bathrooms_number: number,
    kitchens_number: number,
    age: number,
    status: string|null,
    location:string,
    apartment_number: string,
    apartment_floor: string,
    min_apartment_floor: string|null,
    createdAt:string,
    updatedAt: string,
    property_id: number,
    type:string
}
export interface amenitiesInfo{
    id: number,
        pool: boolean,
        garden: boolean,
        servants_room: boolean,
        ac: boolean,
        furnished: boolean,
        kitchen: boolean,
        car_entrance: boolean,
        garage: boolean,
        createdAt: string,
        updatedAt:string,
        property_id: number
}
export interface userInfo{
id: number,
username: string,
email:string,
status: string,
createdAt: string,
updatedAt:string
}
export interface returnRealState{
    id:number,
    type:string,
    license_number:string,
    advertisement_number:string,
    partnership_amount:number,
    finance:boolean,
    status:string,
    createdAt:string,
    updatedAt:string,
    partner_type_id:number,
    user_id:number,
    property_type_id:number,
    property_owner_type_id:number,
    property_purpose_id:number,
    property_type_details_id:number,
    propertyLocation:properityLocationInfo,
    landDetails:landInfo[],
    details:detailOneInfo[],
    amenities:amenitiesInfo[],
    user:userInfo,
    propertyType:detailsType,
    partnerType:detailsType,
    propertyTypeDetails:detailsMoreType
}
export interface imageInfo{
    name: string;
    link: string | ArrayBuffer|null 
}
export interface DataSendInfo{
    property_owner_type_id: number,
    property_purpose_id: number,
    property_type_id: number,
    partner_type_id: number,
    city: string,
    district: string,
    address: string,
    area: number,
    price: number,
    lat: number,
    long: number,
    is_divisible: boolean,
}
export interface landDetailPutINfo{
    id:number,
    type:string,
    license_number:string,
    advertisement_number:string,
    partnership_amount:number,
    finance:boolean,
    status:string,
    createdAt:string,
    updatedAt:string,
    partner_type_id:number,
    user_id:number,
    property_type_id:number,
    property_owner_type_id:number,
    property_purpose_id:number,
    property_type_details_id:number,
    propertyLocation:properityLocationInfo,
    landDetails:landInfo[],
}
export interface locationInfo{
    id:number,
    type:string,
    license_number:string,
    advertisement_number:string,
    partnership_amount:number,
    finance:boolean,
    status:string,
    createdAt:string,
    updatedAt:string,
    partner_type_id:number,
    user_id:number,
    property_type_id:number,
    property_owner_type_id:number,
    property_purpose_id:number,
    property_type_details_id:number,
    propertyLocation:properityLocationInfo,
}
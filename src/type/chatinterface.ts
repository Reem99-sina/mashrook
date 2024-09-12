import {detailsMoreType,detailsType,landInfo,detailOneInfo} from "./addrealestate"
export interface chatdetailinfo{
    id?: number,
    message: string,
    type: string,
    createdAt: string,
    updatedAt?:string,
    room_id: number,
    user_id: number,
    alert_link: null|string,
alert_link_text: null|string,
alert_link_type:null|string ,
alert_message: string|null,
alert_message_text:string|null
}
export interface chatInfo{
    blocker_id:null|number ,
createdAt: string,
details: detailOneInfo|null,
details_id: null|number,
id: number,
landDetails: landInfo|null,
land_details_id: number,
lastMessage:chatdetailinfo ,
last_message_id: number,
property: { type: string, is_divisible: boolean, license_number: string, advertisement_number: string,
    age: null|number,
    area: number,
    createdAt: string,
    expire_date: string,
    finance: boolean,
    id: number,
   
    partner_type_id: null|number,
    partnership_amount:number|null,
    propertyType: detailsType,
    propertyTypeDetails:detailsMoreType ,
    property_owner_type_id: number,
    property_purpose_id: number,
    property_type_details_id : number,
    property_type_id: number,
    status: string,
 
    updatedAt: string,
    user_id: number

},
property_id: number,
receiver_id: number,
sender_id: number,
status: string,
updatedAt: string
}
export interface messagePusher{
    authorId: number, message: string,
    type:string
}
export interface User {
    id:number,
    name?:string,
    email?:string,
    address?:{
        street:string,
        city:string
    },
    phoneNumbers?: string 
}

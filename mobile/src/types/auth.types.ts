export interface User{
    _id:string,
    name:string,
    email:string
}
export interface AuthResponse{
    token:string,
    success:boolean,
    user:User
}
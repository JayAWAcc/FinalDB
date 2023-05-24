export interface UserResponse{
  success:boolean;
  code:number;
  message:string;
  token?:string;
  user?:User;
}

export interface User{id:number, username:string,profiles:{id:number, role:string}[] }

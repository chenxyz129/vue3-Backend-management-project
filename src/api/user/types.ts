export interface loginFormData {
  username: string;
  password: string;
}
export interface responData {
  code: number;
  message: string;
  ok: boolean;
}
export interface loginResponData extends responData{
  data:string
}
export interface InfoResponData extends responData{
  data:{
    routes:string[],
    buttons:string[],
    roles:string[],
    name:string,
    avatar:string,
  }
}
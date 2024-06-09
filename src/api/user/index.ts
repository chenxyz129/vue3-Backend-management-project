import request from "@/utils/request";
import type {loginFormData ,loginResponData,InfoResponData} from "./types";
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
const reqLogin = (data: loginFormData) => request.post<any, loginResponData>(API.LOGIN_URL, data);
const reqUserInfo = () => request.get<any, InfoResponData>(API.USERINFO_URL);
const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);

export { reqLogin, reqUserInfo, reqLogout };

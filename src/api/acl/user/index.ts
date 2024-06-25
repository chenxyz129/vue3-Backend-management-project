import request from "@/utils/request";
enum API {
  URL_getUserList = "/admin/acl/user/",
  URL_addUser = "/admin/acl/user/save",
  URL_updateUser = "/admin/acl/user/update",
  URL_getRoleInfoByUserId='/admin/acl/user/toAssign/',
  URL_saveRoleOfUser='/admin/acl/user/doAssignRole',
  URL_delUser="/admin/acl/user/remove/",
  URL_batchDelUser='/admin/acl/user/batchRemove'
}
export const reqGetUserList = (page: number, limit: number,username:string) =>
  request.get(API.URL_getUserList + `${page}/${limit}/?username=${username}`);
export const reqAddOrUpdateUser = (data: any) => {
  if (data.id) {
    return request.put(API.URL_updateUser, data);
  } else {
    return request.post(API.URL_addUser, data);
  }
};
export const reqGetRoleInfoByUserId =(userId:number)=>request.get(API.URL_getRoleInfoByUserId+userId)
export const reqSaveRoleOfUser=(data:any)=>request.post(API.URL_saveRoleOfUser,data)
export const reqDelUser=(userId:number)=>request.delete(API.URL_delUser+userId)
export const reqbatchDelUser=(data:any)=>request.delete(API.URL_batchDelUser,data)
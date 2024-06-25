import request from "@/utils/request";
enum API {
  URL_getRoleList = "/admin/acl/role/",
  URL_addRole = "/admin/acl/role/save",
  URL_UpdateRole = "/admin/acl/role/update",
  URL_getAuthorityListByRoelid = "/admin/acl/permission/toAssign/",
  URL_saveAuthorityList = "/admin/acl/permission/doAssignAcl",
  URL_delRole='/admin/acl/role/remove/'
}

export const reqGetRoleList = (page: number, limit: number, roleName: string) =>
  request.get(API.URL_getRoleList + `${page}/${limit}/?roleName=${roleName}`);
export const addOrUpdateRole = (roleName: string, id: number | string) => {
  if (id) {
    return request.put(API.URL_UpdateRole, { roleName: roleName, id });
  } else {
    return request.post(API.URL_addRole, { roleName: roleName, id });
  }
};
export const reqGetAuthority = (roleId: number) =>
  request.get(API.URL_getAuthorityListByRoelid + roleId);
export const reqsaveAuthorityList = (roleId: number, permissionIdList: []) =>
  request.post(API.URL_saveAuthorityList, { roleId, permissionIdList });
export const reqDelRole=(RoleId:number)=>request.delete(API.URL_delRole+RoleId)
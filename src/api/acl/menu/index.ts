import request from "@/utils/request";
enum API {
  URL_getMenu = "/admin/acl/permission",
  URL_addMenu = "/admin/acl/permission/save",
  URL_updateMenu = "/admin/acl/permission/update",
  URL_delMenu = "/admin/acl/permission/remove/",
}
export const reqGetMenu = () => request.get(API.URL_getMenu);
export const reqAddOrUpdateMenu = (data: any) => {
  if (data.id) {
    return request.put(API.URL_updateMenu, data);
  } else {
    return request.post(API.URL_addMenu, data);
  }
};
export const reqDelMenu=(id:number)=>request.delete(API.URL_delMenu+id)
import request from "@/utils/request";
import type { resCategoryData } from "./type";
import type { Ref } from "vue";
enum API {
  URL_C1 = "/admin/product/getCategory1",
  URL_C2 = "/admin/product/getCategory2/",
  URL_C3 = "admin/product/getCategory3/",
  URL_attrInfoList = "/admin/product/attrInfoList/",
  URL_saveAttrInfo ='/admin/product/saveAttrInfo',
  URL_deleteAttr ="/admin/product/deleteAttr/"
}

export const reqC1 = () => request.get<any, resCategoryData>(API.URL_C1);
export const reqC2 = (category1Id:number|string) =>
  request.get<any, resCategoryData>(API.URL_C2 + category1Id);
export const reqC3 = (category2Id: number |string) =>
  request.get<any, resCategoryData>(API.URL_C3 + category2Id);

export const reqAttrInfoList = (
  category1Id: number|string,
  category2Id: number|string,
  category3Id: number|string
) =>
  request.get<any, any>(
    API.URL_attrInfoList + `${category1Id}/${category2Id}/${category3Id}`
  );
export const reqSaveAttrInfo =(data:any)=>request.post<any,any>(API.URL_saveAttrInfo,data)
export const reqdeleteAttr =(attrId:number)=>request.delete<any,any>(API.URL_deleteAttr+attrId)
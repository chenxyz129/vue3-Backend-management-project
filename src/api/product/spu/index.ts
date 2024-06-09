import request from "@/utils/request";
import type { resData } from "./type";
enum API {
  URL_getProduct = "/admin/product/",
  URL_getSpuInfo = "/admin/product/getSpuInfo/",
  URL_saveSpuInfo = "/admin/product/saveSpuInfo",
  URL_updateSpuInfo = "/admin/product/updateSpuInfo",
}
export const reqGetProduct = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, resData>(
    API.URL_getProduct + `${page}/${limit}?category3Id=${category3Id}`
  );
export const reqGetSpuInfoById = (spuid: number) =>
  request.get(API.URL_getSpuInfo + spuid);
export const reqSaveSpuInfo = (data: any) => {
  if (data.id) {
   return  request.post<any, any>(API.URL_updateSpuInfo, data);
  }else{
   return  request.post(API.URL_saveSpuInfo,data)
  }
};

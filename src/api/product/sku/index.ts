import request from "@/utils/request";
enum API {
  URL_saveSkuInfo = "/admin/product/saveSkuInfo",
  URL_getSkuInfoByspuId = "/admin/product/findBySpuId/",
  URL_getSkuInfoByPage = "/admin/product/list/",
  URL_skuOnSale = "/admin/product/onSale/",
  URL_skuCancelSale = "/admin/product/cancelSale/",
  URL_getSkuInfoBySkuId = "/admin/product/getSkuInfo/",
  URL_delSkuBySkuId = "/admin/product/deleteSku/",
}

export const reqsaveSkuInfo = (data: any) =>
  request.post(API.URL_saveSkuInfo, data);
export const reqGetSpuInfoById = (spuId: number) =>
  request.get(API.URL_getSkuInfoByspuId + spuId);
export const reqGetSkuInfoByPage = (page: number, limit: number) =>
  request.get(API.URL_getSkuInfoByPage + `${page}/${limit}`);
export const reqSetSkuSaleOrUnsale = (skuId: number, isSale: number) =>
  request.get(
    isSale == 1
      ? `${API.URL_skuCancelSale}${skuId}`
      : `${API.URL_skuOnSale}${skuId}`
  );
export const reqGetSkuInfoBySkuId = (skuId: number) =>
  request.get(API.URL_getSkuInfoBySkuId + skuId);
export const reqDelSkuBySkuId =(SkuId:number)=>request.delete(API.URL_delSkuBySkuId+SkuId)
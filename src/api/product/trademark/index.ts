import request from "@/utils/request";
import type { resTrademarkList } from "./type";
enum API {
  URL_TrademarkList = "/admin/product/baseCategoryTrademark/findTrademarkList/",
  URL_AddTrademarkList = "/admin/product/baseCategoryTrademark/save",
}
export const reqTrademarkList = (category3Id: string|number) =>
  request.get<any, resTrademarkList>(API.URL_TrademarkList + `${category3Id}`);

export const reqAddTrademarkList = (id:number) =>
  request.post<any, any>(API.URL_AddTrademarkList, {
    category3Id: 2,
    trademarkIdList: [0],
  });

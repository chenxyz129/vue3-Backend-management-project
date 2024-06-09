export interface resData {
  code: number;
  data: Data;
  message: string;
  ok: boolean;
}
export interface Data {
  current: number;
  hitCount: boolean;
  pages: number;
  records: records;
  total: number;
}
export interface records {
  category3Id: number;
  createTime: string;
  description: string;
  id: number;
  spuImageList: [];
  spuName: string;
  spuPosterList: [];
  spuSaleAttrList: [];
  tmId: number;
  updateTime: string;
}

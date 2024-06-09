export interface resCategoryData {
  code: number;
  data: categoryObj[];
  message: string;
  ok: boolean;
}
interface categoryObj {
  createTime: string;
  id: number;
  name: string;
  updateTime: string;
  category1Id?: number;
  category2Id?: number;
}

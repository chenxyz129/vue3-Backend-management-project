export interface resTrademarkList {
  code: number;
  message: string;
  ok: string;
  data: [
    {
      id: number;
      createTime: string;
      updateTime: string;
      tmName: string;
      logoUrl: string;
    }
  ];
}

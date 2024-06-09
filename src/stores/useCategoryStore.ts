import { defineStore } from "pinia";
import { ref } from "vue";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import type { resCategoryData } from "@/api/product/attr/type";

export const useCategoryStore = defineStore("category", () => {
  const C1arr = ref<any>([]);
  const C1Id = ref<number | string>("");
  const C2arr = ref<any>([]);
  const C2Id = ref<number | string>("");
  const C3arr = ref<any>([]);
  const C3Id = ref<number | string>("");
  const attrArr = ref()
  const getC1 = async () => {
    
    const result: resCategoryData = await reqC1();
    if (result.code == 200) {
      C1arr.value = result.data;
    } else {
    }
  };
  const getC2 = async () => {
    
    const result = await reqC2(C1Id.value);
    if (result.code == 200) {
      C2arr.value = result.data;
    }
  };
  const getC3 = async () => {
    const result = await reqC3(C2Id.value);
    if (result.code == 200) {
      C3arr.value = result.data;
    }
  };
  return { C1arr, C1Id, getC1, C2arr, C2Id, getC2, C3arr, C3Id, getC3,attrArr };
});

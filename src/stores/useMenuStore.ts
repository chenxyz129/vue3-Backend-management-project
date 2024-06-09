import { defineStore } from "pinia";

const useMenuStore = defineStore("useMenuStore", {
  state: () => ({
    isMenuCollapse: false,
    isChange:true
  }),
  actions: {},

  getters: {},
});
export default useMenuStore;

import { defineStore } from "pinia";
import type { CatalogType, MemoType } from "./types";
import { geneId, localSetItem, localGetItem } from "@/utils";

const indexStore = defineStore("index", {
  state: () => ({
    catalogs: [] as CatalogType[],
    memos: [] as MemoType[],
    active_cataid: null as number | null,
    active_memoid: null as number | null,
  }),
  actions: {
    // 获取目录列表
    getCatalogs() {
      let data = localGetItem("catalogs");
      if (data) {
        this.catalogs = data;
      }
    },
    // 创建目录
    createCata(val: Pick<CatalogType, "user_id" | "cata_name">) {
      let curcata = Object.assign({}, val, {
        cata_id: geneId(),
      });
      this.catalogs.push(curcata);
      localSetItem("catalogs", this.catalogs);
    },
    // 修改目录
    updateCata(id: number, name: string) {
      let index = this.catalogs.findIndex((r) => r.cata_id == id);
      if (index >= 0) {
        this.catalogs[index].cata_name = name;
        localSetItem("catalogs", this.catalogs);
      }
    },
    // 删除目录
    removeCata(id: number) {
      let index = this.catalogs.findIndex((r) => r.cata_id == id);
      if (index >= 0) {
        this.catalogs.splice(index, 1);
        localSetItem("catalogs", this.catalogs);
      }
    },
    setCateId(id: number | null) {
      this.active_cataid = id;
      localSetItem("active_cataid", id);
      if (this.activeMemos.length == 0) {
        this.setMemoId(null);
      } else {
        this.setMemoId(this.activeMemos[0].memo_id);
      }
    },
    // 获取备忘录列表
    getMemos() {
      let data = localGetItem("memos");
      if (data) {
        this.memos = data;
      }
    },
    // 创建备忘录
    createMemo(val: Pick<MemoType, "title" | "cata_id" | "content">) {
      let memo = Object.assign({}, val, {
        memo_id: geneId(),
        update_at: new Date().valueOf(),
      });
      this.memos.push(memo);
      localSetItem("memos", this.memos);
    },
    // 修改备忘录
    updateMemo(id: number, data: Partial<MemoType>) {
      let index = this.memos.findIndex((r) => r.memo_id == id);
      if (index >= 0) {
        this.memos[index] = { ...this.memos[index], ...data };
        localSetItem("memos", this.memos);
      }
    },
    // 删除备忘录
    removeMemo(id: number) {
      let index = this.memos.findIndex((r) => r.memo_id == id);
      if (index >= 0) {
        this.memos.splice(index, 1);
        localSetItem("memos", this.memos);
      }
    },
    setMemoId(id: number | null) {
      this.active_memoid = id;
      localSetItem("active_memoid", id);
    },
    getActiveId() {
      this.active_cataid = localGetItem("active_cataid");
      this.active_memoid = localGetItem("active_memoid");
    },
  },
  getters: {
    activeMemos: (state) =>
      state.memos.filter((r) => r.cata_id == state.active_cataid),
  },
});

export default indexStore;

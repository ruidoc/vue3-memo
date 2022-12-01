<template>
  <div class="index-page">
    <div class="catalogs">
      <cataloge></cataloge>
    </div>
    <div class="memos">
      <menos></menos>
    </div>
    <div class="detail">
      <template v-if="store.active_memoid">
        <cus-editor v-model="content">
          <input placeholder="输入标题" class="title" v-model="title" />
        </cus-editor>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { indexStore } from "@/stores";
import CusEditor from "@/components/CusEditor.vue";
import Cataloge from "./catalogs.vue";
import Menos from "./menos.vue";
const store = indexStore();
const title = ref("");
const content = ref("");
const cur_memo = computed(() => {
  let memo = store.activeMemos.find(
    (row) => row.memo_id == store.active_memoid
  );
  return memo || null;
});
watch(cur_memo, (val) => {
  if (val) {
    title.value = val.title;
    content.value = val.content;
  } else {
    title.value = content.value = "";
  }
});
</script>

<style lang="less">
.index-page {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 55px);
  .catalogs {
    width: 20%;
    background: #f9f9f9;
  }
  .memos {
    width: 25%;
    border-right: 1px solid #f0f3f5;
  }
  .detail {
    flex: 1;
    min-width: 300px;
    .title {
      border: none;
      outline: none;
      font-size: 19px;
      margin: 20px 20px 0 20px;
      padding-bottom: 14px;
      width: calc(100% - 40px);
      border-bottom: 1px solid #f0f3f5;
      &::placeholder {
        color: #999;
      }
    }
  }
}
</style>

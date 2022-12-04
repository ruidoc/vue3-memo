<template>
  <div class="index-page">
    <div class="catalogs">
      <cataloge></cataloge>
    </div>
    <div class="memos">
      <menos></menos>
    </div>
    <div class="detail">
      <template v-if="cur_memo">
        <cus-editor v-model="content" @update:modelValue="contentChange">
          <input
            placeholder="输入标题"
            class="memo-title"
            v-model="title"
            @input="titleChange"
          />
        </cus-editor>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { indexStore } from "@/stores";
import CusEditor from "@/components/CusEditor.vue";
import Cataloge from "./catalogs.vue";
import Menos from "./menos.vue";
import { debounce } from "@/utils";
const store = indexStore();
const title = ref("");
const content = ref("");
const cur_memo = computed(() => {
  let memo = store.activeMemos.find(
    (row) => row.memo_id == store.active_memoid
  );
  return memo || null;
});

const titleChange = debounce(() => {
  store.updateMemo({
    title: title.value,
  });
});

const contentChange = debounce((strs: string[]) => {
  // console.log("触发修改事件：", content.value, strs);
  store.updateMemo({
    content: strs[0],
  });
});

watch(cur_memo, (val) => {
  if (val) {
    nextTick(() => {
      title.value = val.title;
      content.value = val.content;
    });
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
    .memo-title {
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

<template>
  <div class="index-page">
    <div class="catalogs">
      <cataloge></cataloge>
    </div>
    <div class="memos">
      <menos></menos>
    </div>
    <div class="detail">
      <template v-if="cur_memoid">
        <cus-editor
          v-model="content"
          @update:modelValue="contentChange(cur_memoid, content)"
        >
          <!-- {{ content }} -->
          <input
            placeholder="输入标题"
            class="memo-title"
            v-model="title"
            @input="titleChange(cur_memoid, title)"
          />
        </cus-editor>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { indexStore } from "@/stores";
import CusEditor from "@/components/CusEditor.vue";
import Cataloge from "./catalogs.vue";
import Menos from "./menos.vue";
import { debounce } from "@/utils";
const store = indexStore();
const title = ref("");
const content = ref("");
const cur_memoid = computed(() => store.active_memoid);

const titleChange = debounce((id: number, title: string) => {
  store.updateMemo(id, {
    title: title,
  });
});

const contentChange = debounce((id: number, ctx: string) => {
  console.log("触发修改事件：", content.value, ctx);
  store.updateMemo(id, {
    content: ctx,
  });
});

const updateCtx = () => {
  let cur_memo = store.activeMemos.find(
    (row) => row.memo_id == cur_memoid.value
  );
  if (cur_memo) {
    // debugger;
    // 避免数据修改页面不更新
    nextTick(() => {
      title.value = cur_memo.title;
      content.value = cur_memo.content;
    });
  }
};

watch(cur_memoid, (val) => {
  if (val) {
    updateCtx();
  } else {
    title.value = content.value = "";
  }
});
onMounted(() => {
  updateCtx();
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

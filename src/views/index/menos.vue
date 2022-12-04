<template>
  <div class="menos-comp">
    <div class="handel">
      <span>共 {{ store.activeMemos.length }} 条备忘录</span>
      <el-button
        :icon="Plus"
        circle
        :disabled="!store.active_cataid"
        @click="toCreate"
      />
    </div>
    <div class="menos-list">
      <div
        v-for="item in store.activeMemos"
        :key="item.memo_id"
        :class="
          store.active_memoid == item.memo_id ? 'meno-item active' : 'meno-item'
        "
        @click="store.setMemoId(item.memo_id)"
      >
        <div class="meno-item-inner">
          <h3>{{ item.title }}</h3>
          <span class="text">{{ FormatTime(item.update_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { indexStore } from "@/stores";
import { Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { FormatTime } from "@/utils";
const store = indexStore();
const toCreate = () => {
  ElMessageBox.prompt("输入备忘录标题", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPlaceholder: "标题",
  }).then((res) => {
    console.log(res);
    if (res.value && store.active_cataid) {
      store.createMemo({
        cata_id: store.active_cataid,
        title: res.value,
        content: +new Date() + "",
      });
    }
  });
};
</script>

<style lang="less">
.menos-comp {
  .handel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid #f0f3f5;
  }
  .menos-list {
    padding: 0;
    .meno-item {
      padding: 10px 14px;
      border-bottom: 1px solid #f0f3f5;
      .meno-item-inner {
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 14px;
        h3 {
          margin-bottom: 4px;
        }
        .text {
          color: #777;
        }
      }
      &.active {
        .meno-item-inner {
          background: #f0f3f5;
        }
      }
      &:hover {
        .meno-item-inner {
          cursor: pointer;
          background: #f0f3f5;
        }
      }
    }
  }
}
</style>

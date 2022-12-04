<template>
  <div class="catalogs-comp">
    <div class="handel">
      <el-button round @click="toCreate">新建文件夹</el-button>
    </div>
    <div class="catas-list">
      <div
        v-for="item in store.catalogs"
        :key="item.cata_id"
        :class="
          store.active_cataid == item.cata_id ? 'cata-item active' : 'cata-item'
        "
        @click="store.setCateId(item.cata_id)"
      >
        <el-icon :size="17">
          <FolderOpened v-if="store.active_cataid == item.cata_id" />
          <FolderRemove v-else />
        </el-icon>
        <span class="text">{{ item.cata_name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { indexStore } from "@/stores";
import { FolderRemove, FolderOpened } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

const store = indexStore();
const toCreate = () => {
  ElMessageBox.prompt("输入文件夹名称", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPlaceholder: "不超过10个字",
  }).then((res) => {
    console.log(res);
    if (res.value) {
      store.createCata({
        user_id: 4204,
        cata_name: res.value,
      });
    }
  });
};
</script>

<style lang="less">
.catalogs-comp {
  .handel {
    // text-align: center;
    padding: 10px 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .catas-list {
    padding: 12px 6px;
    .cata-item {
      padding: 6px 18px;
      display: flex;
      align-items: center;
      .text {
        margin-left: 12px;
      }
      &.active {
        color: var(--el-color-primary);
        font-weight: bold;
      }
      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
    }
  }
}
</style>

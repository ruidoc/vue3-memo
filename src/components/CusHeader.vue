<template>
  <header class="customcomp-header">
    <div class="left-box">
      <h1>备忘录应用</h1>
    </div>
    <div class="right-box">
      <template v-if="store.userInfo">
        <span>{{ store.userInfo.user_name }}</span>
        <el-icon color="#fff">
          <arrow-down />
        </el-icon>
        <span class="logout" @click="logout">退出登录</span>
      </template>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
const store = userStore();
const router = useRouter();
const logout = () => {
  ElMessageBox.confirm("确认退出登录？", "操作提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  }).then(() => {
    store.logout();
    router.push("/login");
  });
};
</script>
<style lang="less">
.customcomp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #181818;
  color: #fff;
  height: 55px;
  padding: 0 22px;
  h1 {
    font-size: 22px;
  }
  .right-box {
    display: flex;
    align-items: center;
  }
  .logout {
    cursor: pointer;
    margin-left: 20px;
    font-size: 14px;
    color: beige;
  }
}
</style>

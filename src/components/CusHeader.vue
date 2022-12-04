<template>
  <header class="customcomp-header">
    <div class="left-box">
      <h1>备忘录应用</h1>
    </div>
    <div class="right-box">
      <template v-if="store.userInfo">
        <a target="_blank" href="https://github.com/ruidoc/vue3-memo">
          <img src="@/assets/github.png" alt="源码地址" width="26" />
        </a>
        <el-dropdown @command="onCommand">
          <span class="userdv">
            <span>{{ store.userInfo.user_name }}</span>
            <el-icon color="#fff">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
const onCommand = (cmd: string) => {
  if (cmd == "logout") {
    logout();
  }
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
    font-weight: normal;
  }
  .right-box {
    display: flex;
    align-items: center;
    a {
      color: #fff;
      padding-right: 17px;
      line-height: 1em;
      text-decoration-line: none;
      &:hover {
        background: transparent;
      }
    }
    .userdv {
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      span {
        padding-right: 4px;
      }
    }
  }
  .logout {
    cursor: pointer;
    margin-left: 20px;
    font-size: 14px;
    color: beige;
  }
}
</style>

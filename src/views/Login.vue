<template>
  <div class="login-page">
    <el-form class="login-form">
      <h2 class="title">{{ is_login ? "登录" : "注册" }}</h2>
      <el-form-item v-if="!is_login">
        <el-input placeholder="用户名" size="large" v-model="form.user_name" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="手机号" size="large" v-model="form.phone" />
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="密码"
          size="large"
          show-password
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          size="large"
          :loading="loading"
          @click="submitForm"
          >{{ is_login ? "提交" : "注册" }}</el-button
        >
        <div class="text-row">
          <span class="text-wrap" @click="is_login = !is_login">
            <span>{{
              is_login ? "没有账号？去注册" : "已有账号？去登录"
            }}</span>
            <el-icon><ArrowRight /></el-icon>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores";
import { ref } from "vue";

const form = ref({
  phone: "",
  user_name: "",
  password: "",
});
const is_login = ref(true);
const loading = ref(false);
const store = userStore();
const router = useRouter();

const submitForm = async () => {
  let { value: user } = form;
  if (!user.phone || !user.password) {
    return ElMessage({
      type: "warning",
      message: "手机号和密码不能为空",
    });
  }
  if (user.phone.length != 11 || Number(user.phone) == NaN) {
    return ElMessage({
      type: "warning",
      message: "请输入正确的手机号",
    });
  }
  if (!is_login.value && !user.user_name) {
    return ElMessage({
      type: "warning",
      message: "请输入用户名",
    });
  }
  try {
    loading.value = true;
    if (is_login.value) {
      await store.login(user);
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      await store.register(user);
    }
    loading.value = false;
    ElMessage({
      type: "success",
      message: is_login.value ? "登录成功" : "注册成功",
    });
  } catch (errer: any) {
    loading.value = false;
    ElMessage({
      type: "error",
      message: errer || "错误",
    });
  }
};
</script>
<style lang="less">
.login-page {
  margin: 20vh auto;
  .login-form {
    width: 360px;
    background: #fff;
    padding: 30px 50px 10px 50px;
    border-radius: 7px;
    margin: 20px auto;
    box-shadow: var(--el-box-shadow);
    .title {
      text-align: center;
      margin-bottom: 18px;
    }
    .login-btn {
      margin-top: 14px;
      width: 100%;
    }
    .text-row {
      text-align: right;
      width: 100%;
      padding-top: 5px;
      .text-wrap {
        display: inline-flex;
        cursor: pointer;
        align-items: center;
      }
    }
  }
}
</style>

<template>
  <main class="home-point">
    <cus-header></cus-header>
    <router-view></router-view>
  </main>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import CusHeader from "@/components/CusHeader.vue";
import { userStore } from "@/stores";
const store = userStore();
onMounted(() => {
  let user_str = localStorage.getItem("login_user");
  if (user_str) {
    store.setUser(JSON.parse(user_str));
  }
});
</script>

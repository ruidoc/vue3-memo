<template>
  <main class="home-point">
    <cus-header></cus-header>
    <router-view></router-view>
  </main>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import CusHeader from "@/components/CusHeader.vue";
import { userStore, indexStore } from "@/stores";
const user_store = userStore();
const index_store = indexStore();
onMounted(() => {
  user_store.getUser();
  index_store.getCatalogs();
  index_store.getMemos();
  index_store.getActiveId();
});
</script>

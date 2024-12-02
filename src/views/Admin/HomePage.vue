<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterView, useRoute } from "vue-router";
import Sidebar from "@/components/Admin/SideBar.vue";
import Header from "@/components/Admin/Header.vue";
import Footer from "@/components/Admin/Footer.vue";
import { watch, ref } from "vue";
const route = new useRoute();
const titleHeader = ref("");
watch(
  () => route.name,
  (newName) => {
    switch (newName) {
      case "dashboard": {
        titleHeader.value = "Admin | Dashboard";
        document.title = "Admin Dashboard";
        break;
      }
      case "account": {
        titleHeader.value = "Admin | Account";
        document.title = "Admin Account";
        break;
      }
      case "category": {
        titleHeader.value = "Admin | Category";
        document.title = "Admin Category";
        break;
      }
      case "product": {
        titleHeader.value = "Admin | Product";
        document.title = "Admin Product";
        break;
      }
      case "order": {
        titleHeader.value = "Admin | Order";
        document.title = "Admin Order";
        break;
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main website -->
      <div class="col-9 offset-3 p-0 position-relative">
        <!-- Header -->
        <Header :titleHeader="titleHeader" />
        <!-- Content -->
        <RouterView />
        <!-- Footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>

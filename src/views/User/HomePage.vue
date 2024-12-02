<script setup>
import "@/assets/client.css";
import Header from "@/components/User/Header.vue";
import Navbar from "@/components/User/Navbar.vue";
import Footer from "@/components/User/Footer.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { RouterView } from "vue-router";
import { ref } from "vue";
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12">
        <!-- Header -->
        <Header />
        <!-- Header -->
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <!-- Nav -->
        <Navbar />
        <!-- Nav -->
      </div>
    </div>
    <RouterView />
    <div class="row">
      <div class="col-12">
        <!-- Footer -->
        <Footer />
        <!-- Footer -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-website {
  min-height: 800px;
}
</style>

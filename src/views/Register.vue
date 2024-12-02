<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
let url = "http://localhost:8080/vuejs-server/api.php/register";
import axios from "axios";
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");

const handleSubmit = async () => {
  try {
    let data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    let response = await axios.post(url, data);
    if (response.data.message) {
      alert("Đăng ký thành công");
      router.push("/login");
    }
  } catch (error) {
    console.log(`Loi call API ${error}`);
  }
};

const handleChange = (field) => {
  switch (field) {
    case "name": {
      nameError.value = name.value == "" ? "Không được để trống name" : "";
      break;
    }
    case "email": {
      emailError.value = email.value == "" ? "Không được để trống email" : "";
      break;
    }
    case "password": {
      passwordError.value =
        password.value == "" ? "Không được để trống password" : "";
      break;
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Đăng ký</h1>
    <div class="mb-4">
      <label for="name">Name</label>
      <input
        type="text"
        placeholder="Name"
        id="name"
        v-model="name"
        @keyup="handleChange('name')"
        class="form-control"
      />
      <span v-if="nameError != ''" class="text-danger">{{ nameError }}</span>
    </div>

    <div class="mb-4">
      <label for="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        id="email"
        class="form-control"
        v-model="email"
        @keyup="handleChange('email')"
      />
      <span v-if="emailError != ''" class="text-danger">{{ emailError }}</span>
    </div>

    <div class="mb-4">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        class="form-control"
        v-model="password"
        @keyup="handleChange('password')"
      />
      <span v-if="passwordError != ''" class="text-danger">{{
        passwordError
      }}</span>
    </div>
    <span class="register">
      Đã có tài khoản:
      <RouterLink to="/login">Đăng nhập</RouterLink>
    </span>
    <button class="btn btn-success">Đăng ký</button>
  </form>
</template>

<style scoped lang="scss">
form {
  width: 60%;
  margin: auto;
  margin-top: 50px;
  .register {
    display: block;
    margin-bottom: 10px;
  }
}
</style>

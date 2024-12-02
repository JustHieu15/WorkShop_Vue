<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";

const router = useRouter();
let url = "http://localhost:8080/vuejs-server/api.php/login";
const email = ref("");
const password = ref("");

const emailError = ref("");
const passwordError = ref("");

const handleSubmit = async () => {
  try {
    let data = {
      email: email.value,
      password: password.value,
    };
    let response = await axios.post(url, data);
    let message = response.data;

    if (message.status == true) {
      localStorage.removeItem("userLogin");
      let userLogin = {
        id: message.data.id,
        name: message.data.name,
        email: message.data.email,
        role: message.data.role,
      };
      localStorage.setItem("userLogin", JSON.stringify(userLogin));

      if (message.data.role == "user") {
        router.push("/");
      } else if (message.data.role == "admin") {
        router.push("/admin");
      }
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng");
    }
  } catch (error) {
    console.log(`Loi call API ${error}`);
  }
};

const handleValidate = (field) => {
  switch (field) {
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
    <h1>Đăng nhập</h1>
    <div class="mb-4">
      <label for="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        id="email"
        class="form-control"
        v-model="email"
        @keyup="handleValidate('email')"
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
        @keyup="handleValidate('password')"
      />
      <span v-if="passwordError != ''" class="text-danger">
        {{ passwordError }}
      </span>
    </div>
    <span class="register">
      Chưa có tài khoản:
      <RouterLink to="/register">Đăng ký</RouterLink>
    </span>
    <button class="btn btn-primary">Đăng nhập</button>
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

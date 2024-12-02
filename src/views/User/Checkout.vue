<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const name = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const router = useRouter();

const cartDetail = ref([]);
let urlCartDetail = "http://localhost:8080/vuejs-server/api.php/cart-detail";
let urlCheckout = "http://localhost:8080/vuejs-server/api.php/check-out";
const callAPI = async () => {
  try {
    let user_id = JSON.parse(localStorage.getItem("userLogin")).id;
    let response = await axios.get(urlCartDetail + "?user_id=" + user_id);
    if (response.status == 200) {
      cartDetail.value = response.data.cart_details;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  callAPI();
});

const convertPrice = (number) => {
  return number.toLocaleString("vi-VN");
};

const handleSubmit = async () => {
  try {
    let user_id = JSON.parse(localStorage.getItem("userLogin")).id;
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("name", name.value);
    formData.append("address", address.value);
    formData.append("phone", phone.value);
    formData.append("email", email.value);

    let response = await axios.post(urlCheckout, formData);
    if (response.status == 200) {
      alert("Thanh toán thành công");
      router.push("/don-hang");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="row main-website justify-content-center mt-5">
    <div class="col-10">
      <div class="container">
        <div class="row">
          <div class="col-7">
            <h4>Thông tin thanh toán</h4>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  v-model="name"
                  class="form-control"
                />
              </div>
              <div class="mb-4">
                <label for="address">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  v-model="address"
                  class="form-control"
                />
              </div>
              <div class="mb-4">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  id="phone"
                  v-model="phone"
                  class="form-control"
                />
              </div>
              <div class="mb-4">
                <label for="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  v-model="email"
                  class="form-control"
                />
              </div>
              <button class="btn btn-success">Xác nhận thanh toán</button>
            </form>
          </div>
          <div class="col-5">
            <h4>Danh sách sản phẩm</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartDetail" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.product_name }}</td>
                  <td>{{ convertPrice(item.price) }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>
                    {{
                      convertPrice(Number(item.price) * Number(item.quantity))
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import anh1 from "@/assets/image/anh1.jpg";
let urlProductDetail =
  "http://localhost:8080/vuejs-server/api.php/product-detail";
let urlAddCart = "http://localhost:8080/vuejs-server/api.php/cart";
let urlImage = "http://localhost:8080/vuejs-server/uploads/product/";
const route = useRoute();
const router = useRouter();

const product = ref({});
const callAPI = async () => {
  try {
    let url = urlProductDetail + "?product_id=" + route.params.id;
    let response = await axios.get(url);

    if (response.data.status) {
      product.value = response.data.products;
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

const quantity = ref(1);

const addCart = async () => {
  if (quantity.value >= 1) {
    try {
      let url =
        urlAddCart +
        "/" +
        "?product_id=" +
        product.value.id +
        "&quantity=" +
        quantity.value +
        "&user_id=" +
        JSON.parse(localStorage.getItem("userLogin")).id;

      let response = await axios.get(url);
      alert(response.data.message);
      router.push("/giohang");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="row main-website justify-content-center mt-5">
    <div class="col-8">
      <div class="container">
        <h4 class="mb-5">Chi tiết sản phẩm</h4>
        <div class="row">
          <div class="col-3">
            <img
              v-if="product.image != null"
              :src="urlImage + product.image"
              alt=""
              class="img-product"
            />
            <img v-else :src="anh1" alt="" class="img-product" />
          </div>
          <div class="col-9">
            <p><span class="fw-bold">Tên sản phẩm:</span> {{ product.name }}</p>
            <p>
              <span class="fw-bold">Danh mục:</span> {{ product.categoryName }}
            </p>
            <p>
              <span class="fw-bold">Giá sản phẩm:</span>
              {{ convertPrice(Number(product.price)) }} vnđ
            </p>
            <p><span class="fw-bold">Mô tả:</span> {{ product.description }}</p>
            <p>
              <span class="fw-bold">Số lượng:</span>
              <input type="text" class="form-control" v-model="quantity" />
            </p>

            <button class="btn btn-success" @click="addCart">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img-product {
  width: 100%;
  object-fit: cover;
}
</style>

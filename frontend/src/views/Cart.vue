<template>
  <div class="cart">
    <b-container>
      <b-row>
        <b-col v-for="item in cartItems" :key="item.id">
          <CartItem
            :id="item.id"
            :csrfToken="csrfToken"
            :title="item.title"
            :price="item.price"
            :description="item.description"
            :imageUrl="item.imageUrl"
          ></CartItem>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";

export default {
  data() {
    return {
      cartItems: [
        {
          id: "1",
          title: "Selam",
          price: 21,
          description: "Selam bro",
          imageUrl:
            "https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"
        },
        {
          id: "2",
          title: "Selam",
          price: 21,
          description: "Selam bro",
          imageUrl:
            "https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"
        },
        {
          id: "3",
          title: "Selam",
          price: 21,
          description: "Selam bro",
          imageUrl:
            "https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"
        },
        {
          id: "4",
          title: "Selam",
          price: 21,
          description: "Selam bro",
          imageUrl:
            "https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"
        }
      ],
      totalPrice: 0
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="shop">
    <h2 class="text-center">Available books:</h2>
    <hr>
    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>
    <div
      v-if="error"
      class="error"
    >
      {{this.error}}
    </div>
    <b-container>
      <b-row>
        <b-col
          v-for="book in books"
          :key="book.id"
        >
          <Book
            :id="book._id"
            :csrfToken="csrfToken"
            :title="book.title"
            :price="book.price"
            :description="book.description"
            :imageUrl="book.imageUrl"
          ></Book>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Book from "../components/Book";
import axios from "axios";
import domain from "../utils/host";

export default {
  name: "shop",
  data: function() {
    return {
      loading: true,
      error: null,
      books: [],
      csrfToken: ""
    };
  },
  created() {
    this.fetchProducts();
  },
  components: {
    Book
  },
  methods: {
    fetchProducts() {
      axios
        .get(domain + "products", {
          params: {
            page: 1
          }
        })
        .then(res => {
          this.loading = false;
          this.books = res.data.products;
        })
        .catch(error => {
          this.loading = false;
          this.error = error;
        });
    }
  },
  props: {
    collapsed: Boolean
  }
};
</script>

<style lang="scss" scoped>
.loading {
  font-size: 3rem;
}
.error {
  font-size: 3rem;
  color: red;
}
</style>

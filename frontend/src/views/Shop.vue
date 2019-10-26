<template>
  <div
    class="shop"
  >
    <h2 class="text-center">Available books:</h2>
    <hr>
    <b-container>
      <b-row>
        <b-col
          v-for="book in books"
          :key="book.id"
        >
          <Book
            :id="book.id"
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

export default {
  name: "shop",
  data: function() {
    return {
      books: [
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
      csrfToken: ""
    };
  },
  components: {
    Book
  },
  methods: {
    onBookClick() {
      console.log("On book click");
    }
  },
  props: {
    collapsed: Boolean
  }
};
</script>

<style lang="scss" scoped>
</style>

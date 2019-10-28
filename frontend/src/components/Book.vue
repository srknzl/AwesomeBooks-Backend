<template>
  <div @click="onClick" class="book">
    <header class="header">
      <h1 class="title">{{ title }}</h1>
    </header>
    <div class="image">
      <img :src="imageUrl" :alt="title" srcset />
    </div>
    <div class="content">
      <h2 class="price">{{ price }}</h2>
      <p class="description">{{ description }}</p>
    </div>
    <div class="actions">
      <a class="btn" :href="'/user/view-product/' + id">View product</a>
      <form action="/user/add-cart" method="post">
        <input type="hidden" name="_csrf" :value="csrfToken" />
        <input type="hidden" name="id" :value="id" id="productId" />
        <button class="btn" type="submit">Add to Cart</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    price: Number,
    description: String,
    title: String,
    id: String,
    csrfToken: String
  },
  
  methods: {
    onClick(){
      this.$router.push({ name: 'detail', params: { id: this.id } })
    }
  }
};
</script>

<style scoped>
form button.btn {
  width: 100%;
}
.btn {
  display: inline-block;
  padding: 0.25rem 1rem;
  text-decoration: none;
  font: inherit;
  border: 1px solid var(--firstColor);
  color: var(--firstColor);
  border-color: rgb(37, 37, 37);
  border-radius: 3px;
  cursor: pointer;
  background-color: lightblue;
}

.btn:hover,
.btn:active {
  background-color: var(--firstColor);
  color: white;
}

.book {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  background-color: khaki;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 12rem;
}

.header,
.content {
  padding: 1rem;
}

.header h1,
.content h1,
.content h2,
.content p {
  margin: 0;
}

.image {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.image img {
  width: 100%;
}

.actions {
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.actions button,
.actions a {
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.2rem;
  text-align: center;
}

.price {
  text-align: center;
  color: black;
  margin-bottom: 0.5rem;
}

.description {
  text-align: center;
  word-wrap: break-word;
}

@media (max-width: 600px) {
  .book {
    width: 80%;
  }
  image img {
    width: 80%;
  }
}
</style>

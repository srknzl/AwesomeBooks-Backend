<template>
  <div id="home">
    <b-card
      title="Welcome to awesome book store!"
      class="mb-2 homeCard"
      border-variant="primary"
      img-src="https://www.incimages.com/uploaded_files/image/970x450/getty_883231284_200013331818843182490_335833.jpg"
      img-alt="Book Image"
      img-top
    >
      <b-card-text>
        The place you can find awesome books for awesome prices.
      </b-card-text>

      <b-button
        to="/signup"
        variant="primary"
      > Join us today!</b-button>
    </b-card>

    <b-card-group deck>
    <b-card class="tripleCard" title="Best prices" img-src="https://www.marshcakes.com/images/price_icon.png" img-alt="Price" img-top>
      <b-card-text>
        Be sure to expect best prices due to our selling system. Users sells to users, thus making every book affordable!
      </b-card-text>
    </b-card>

    <b-card class="tripleCard" title="Trust" img-src="https://images.techhive.com/images/article/2015/11/millennials_trust-100625376-large3x2.jpg" img-alt="Image" img-top>
      <b-card-text>
        We check our sellers behaviours from beginning to end to ensure trust between users.
      </b-card-text>
    </b-card>

    <b-card class="tripleCard" title="Money back guarantee" img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgeAkt2L0xPvszAD-foldAZLY7PFAVpJbnenbN3pE5ObVYefvoQ&s" img-alt="Image" img-top>
      <b-card-text>
        If you do not like a book and wanted to return it, no problem, up to 15 days you will be able to return any book if it is in the same condition as before.
      </b-card-text>
    </b-card>
  </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
.homeCard {
  width: 100%;
  align-items: center;
  padding: 1rem;
}
.homeCard img{
  max-width: 20rem;
}
#home {
  width: 100%;
  height: 100vh;
}
.tripleCard img {
  width: 10rem;
  height: 10rem;
}
.tripleCard{
  align-items: center;
  padding-top: 2rem;
}
</style>

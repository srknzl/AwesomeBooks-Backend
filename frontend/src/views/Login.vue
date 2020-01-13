<template>
  <div id="login">
    <h3>User login</h3>
    <hr>
    <b-form
      @submit="onSubmit"
      class="form"
    >
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          :state="emailValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="emailValidation">
          Please enter a valid email.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="emailValidation">
          Looks good.
        </b-form-valid-feedback>

      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
          :state="passwordValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="passwordValidation">
          Your password should be at least 8 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="passwordValidation">
          Looks good.
        </b-form-valid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        variant="success"
      >Login</b-button>
    </b-form>
    <hr>
    <router-link to="/resetPassword">Forgot your password?</router-link>
  </div>
</template>

<script>
import store from "../store";
import domain from "../utils/host";
import axios from "axios";

export default {
  
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      store.dispatch("login",{
        form : this.form,
        redirect: this.$router.currentRoute.query.redirect
      });
    }
  },
  computed: {
    passwordValidation: function() {
      if (this.form.password == "") return null;
      else return this.form.password.length >= 8;
    },
    emailValidation: function() {
      if (this.form.email == "") return null;
      else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.form.email);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  max-width: 30rem;
}
</style>
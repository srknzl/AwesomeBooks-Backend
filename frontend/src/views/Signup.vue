<template>
  <div id="signup">
    <h3>Register now</h3>
    <hr>
    <b-form
      @submit="onSubmit"
      class="form"
    >

      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="form.username"
          required
          placeholder="Enter username"
          type="text"
          :state="nameValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="nameValidation">
          Your username should be at least 5 characters.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="nameValidation">
          Looks good.
        </b-form-valid-feedback>

      </b-form-group>

      <b-form-group
        id="input-group-2"
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
        id="input-group-3"
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

      <b-form-group
        id="input-group-4"
        label="Repeat Password:"
        label-for="repeatpassword"
      >
        <b-form-input
          id="repeatpassword"
          v-model="form.repeatPassword"
          required
          placeholder="Enter password again"
          type="password"
          :state="repeatPasswordValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="repeatPasswordValidation">
          Your passwords should match
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="repeatPasswordValidation">
          Match!
        </b-form-valid-feedback>

      </b-form-group>

      <b-button
        type="submit"
        variant="success"
      >Signup</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        repeatPassword: "",
        username: ""
      }
    };
  },
  methods: {
    onSubmit(event) {}
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
    },
    repeatPasswordValidation: function() {
      if (this.form.repeatPassword == "") return null;
      else return this.form.repeatPassword == this.form.password;
    },
    nameValidation: function() {
      if (this.form.username == "") return null;
      else return this.form.username.length >= 5;
    }
  }
};
</script>

<style lang="scss" scoped>
#signup {
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
<template>
  <div id="userreset">
    <h4>To recover your password, enter your email</h4>
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

      <b-button
        type="submit"
        variant="success"
      >Submit</b-button>
    </b-form>
  </div>

</template>

<script>
export default {
  data: function() {
    return {
      form: {
        email: ""
      }
    };
  },
  computed: {
    emailValidation: function() {
      if (this.form.email == "") return null;
      else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.form.email);
      }
    }
  },
  methods: {
    onSubmit: function() {

    }
  }
};
</script>

<style lang="scss" scoped>
#userreset {
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
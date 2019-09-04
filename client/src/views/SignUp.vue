<template>
  <div>
    <div class="card shadow-lg rounded container form mx-auto mt-5">
      <div class="row mx-5">
        <div class="col-sm-12 my-5">
          <form @submit.prevent="onSubmit">
            <div class="center">
              <p>
                <b>
                  <u>
                    <h3>SignUp</h3>
                  </u>
                </b>
              </p>
            </div>
            <div class="form-group">
              <label class="pl-1" for="firstname">FirstName</label>
              <input
                type="text"
                class="form-control"
                v-model="$v.form.firstname.$model"
                placeholder="Enter Firstname"
              />
              <div class="pl-2" v-if="$v.form.firstname.$error">
                <small v-if="!$v.form.firstname.required" class="red">FirstName Required</small>
                <small
                  v-if="!$v.form.firstname.maxLength"
                  class="red"
                >FirstName must be 20 characters max</small>
              </div>
            </div>

            <div class="form-group">
              <label class="pl-1" for="lastname">LastName</label>
              <input
                type="text"
                class="form-control"
                v-model="$v.form.lastname.$model"
                placeholder="Enter Lastname"
              />
              <div class="pl-2" v-if="$v.form.lastname.$error">
                <small v-if="!$v.form.lastname.required" class="red">LastName Required</small>
                <small v-if="!$v.form.lastname.maxLength" class="red">LastName must be 20 characters max</small>
            </div>
            </div>

            <div class="form-group">
              <label class="pl-1" for="email">EmailId</label>
              <input
                type="email"
                class="form-control"
                v-model="$v.form.email.$model"
                placeholder="Enter EmailId"
              />
              <div class="pl-2" v-if="$v.form.email.$dirty && $v.form.email.$invalid">
                <small v-if="!$v.form.email.email" class="red">Invalid EmailID</small>
                <small v-if="!$v.form.email.required" class="red">EmailID is required</small>
            </div>
            </div>

            <div class="form-group">
              <label class="pl-1" for="contact">Contact No.</label>
              <input
                type="text"
                class="form-control"
                v-model="$v.form.contact.$model"
                placeholder="Enter Contact No."
              />
              <div class="pl-2" v-if="$v.form.contact.$error">
                <small v-if="!$v.form.contact.required" class="red">Contact Number is Required</small>
                <small v-if="!$v.form.contact.maxLength || !$v.form.contact.minLength" class="red">Invalid Contact Number</small>
            </div>
            </div>

            <div class="form-group">
              <label class="pl-1" for="password">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="$v.form.password.$model"
                placeholder="Enter password"
              />
              <div class="pl-2" v-if="$v.form.password.$error">
                <small v-if="!$v.form.password.required" class="red">Password is Required</small>
                <small v-if="!$v.form.password.maxLength" class="red">Password must be atmost 25 character long</small>
                <small v-if="!$v.form.password.minLength" class="red">Password must be atleast 8 character long</small>
            </div>
            </div>

            <div class="form-group">
              <input
                type="submit"
                :disabled="$v.form.$invalid"
                class="btn btn-dark"
                value="Register"
              />
              Already on ContactBook?
              <router-link to="/">SignIn</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  maxLength,
  minLength
} from "vuelidate/lib/validators";
import userService from "../services/UserService";
import baseService from "../services/BaseService";

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        password: ""
      },
      isSubmitted: true
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      firstname: { required, maxLength: maxLength(20) },
      lastname: { required, maxLength: maxLength(20) },
      email: { required, email },
      contact: { required, minLength: minLength(10), maxLength: maxLength(10) },
      password: { required, minLength: minLength(8), maxLength: maxLength(25) }
    }
  },
  methods: {
    onSubmit: async function() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        try {
          await userService.signUp(this.form);
          alert("Registered Successfully");
          this.$router.push("/");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.form {
  margin: auto;
  width: 40%;
}
</style>

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
                    <h3>Login</h3>
                  </u>
                </b>
              </p>
            </div>
            <div class="form-group">
              <label class="pl-1" for="email">EmailID</label>
              <input
                type="email"
                class="form-control"
                v-model="$v.form.userName.$model"
                placeholder="Enter emailId"
              />
              <div class="pl-2" v-if="$v.form.userName.$dirty && $v.form.userName.$invalid">
                <small v-if="!$v.form.userName.email" class="red">Invalid EmailID</small>
                <small v-if="!$v.form.userName.required" class="red">EmailID is required</small>
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
              <div class="pl-2" v-if="$v.form.password.$dirty && $v.form.password.$invalid">
                <small v-if="!$v.form.password.required" class="red">Password is required</small>
              </div>
            </div>

            <div class="form-group pt-2">
              <input type="submit" :disabled="$v.form.$invalid" class="btn btn-dark" value="LogIn" />
              
                New User?
                <router-link to="register">SignUp</router-link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import UserService from "../services/UserService";
import baseService from "../services/BaseService";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      isSubmitted: true
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      userName: { required, email },
      password: { required }
    }
  },
  userService: null,
  created() {
    this.userService = UserService;
  },
  methods: {
    onSubmit: async function() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      } else {
        try {
          console.log(this.$v.form, this.form);
          let result = await this.userService.validateUser(
            this.form.userName,
            this.form.password
          );
          if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            baseService.userLogInStatus(true);
            this.$router.push("/home");
          } else {
            alert("invalid username/ password");
          }
        } catch (error) {
          // console.log(error);
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

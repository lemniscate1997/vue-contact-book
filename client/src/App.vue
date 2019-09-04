<template>
  <div id="app">
    <div id="nav" class="shadow rounded" v-if="show">
      <div class="mt-1">
        <ul class="menu primary-color">
          <li>
            <i class="fa fa-address-book"></i> ContactBook
          </li>
        </ul>
      </div>
      <div class="mr-auto pl-1 pt-1">
        <ul class="menu">
          <li>
            <router-link to="/home">Home</router-link>
          </li>
          <li>
            <router-link to="/contact-list">ContactList</router-link>
          </li>
        </ul>
      </div>
      <div class="ml-auto pr-4 pt-1">
        <ul class="menu">
          <li>
            <i class="fa fa-sign-out pointer" aria-hidden="true" @click="logout">Logout</i>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import baseservice from "./services/BaseService";
import userService from "./services/UserService";
import { subscribe } from "rxjs";

export default {
  name: "App",
  data() {
    return {
      show: false
    };
  },
  created() {
    baseservice.getUserLogInStatus().subscribe(flag => {
      this.show = flag;
    });
  },
  mounted() {
    if (this.$route.path === "/" || this.$route.path === '/register') {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  methods: {
    async logout() {
      try {
        await userService.signOut();
        localStorage.clear();
        this.$router.push("/");
      } catch (error) {}
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.path === "/" || to.path === '/register') {
        if (localStorage.getItem("user")) {
          this.show = true;
          this.$router.push("/home");
        } else {
          this.show = false;
        }
      } else {
        this.show = true;
      }
    }
  }
};
</script>

<style>
.primary-color {
  color: #42b983;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: white;
}
#nav {
  margin: 25px 50px;
  padding-top: 10px;
  display: flex;
  border: solid 1px rgba(0, 0, 0, 0.125);
  border-radius: 5px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.pointer {
  cursor: pointer;
}

#nav ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}

#nav li {
  padding: 0 10px;
}
</style>

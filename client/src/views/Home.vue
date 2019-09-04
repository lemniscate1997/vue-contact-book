<template>
  <div class="container-fluid mx-auto">
    <div class="card shadow-lg rounded contect-content">
      <div class="card-body" v-if="user">
        <div class="row pt-3 pl-1">
          <div class="col-3">
            <span id="image-container">
              <i class="fa fa-user-o" aria-hidden="true"></i>
            </span>
          </div>
          <div class="col ml-2">
            <span id="data">{{user.name}}</span>
          </div>
        </div>
        <div class="hdivider"></div>
        <ul>
          <li>
            <span>
              <i class="fa fa-envelope pr-2"></i>
              {{user.email}}
            </span>
          </li>
          <li>
            <span>
              <i class="fa fa-phone pr-2"></i>
              {{user.contact}}
            </span>
          </li>
          <li>
            <span>
              <i class="fa fa-address-card pr-2"></i>
              {{user.role}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>

<style scoped>
#data {
  font-size: 34px;
}

.hdivider {
  margin-top: 50px;
  border-bottom: solid 1px #eaf0f5;
}

.contect-content {
  margin: 50px auto;
  width: 40%;
  height: fit-content;
  max-height: 500px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px 10px;
  border-bottom: solid 1px #eaf0f5;
}

li:last-child {
  border: none;
}

#image-container {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #deece0;
  text-align: center;
  display: inline-block;
  line-height: 97px;
  font-weight: 500;
  font-size: 40px;
}
</style>

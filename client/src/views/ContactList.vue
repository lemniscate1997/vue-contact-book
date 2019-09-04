<template>
  <div>
    <div class="container-fluid px-5">
      <div class="block">
        <div class="card shadow rounded contect-list">
          <div class="card-body">
            <div class="shadow-sm">
              <input type="text" class="form-control" v-model="search" placeholder="Search" />
            </div>
            <hr />
            <ul class="list">
              <li v-for="(contact, index) in contacts" class="pointer" @click="view(index)">
                <span class="no-image">{{contact.firstname[0]}}</span>
                {{contact.firstname}} {{contact.lastname}}
              </li>
            </ul>
          </div>
        </div>
        <div class="card shadow rounded contect-content">
          <div class="card-body" v-if="viewData">
            <div class="row pt-3 pl-1">
              <div class="col-2">
                <span id="image-container">{{viewData.firstname[0]}}</span>
              </div>
              <div class="col ml-2">
                <span id="data">{{viewData.firstname}} {{viewData.lastname}}</span>
                <div class="action">
                  <a @click="remove()" class="pointer pr-2">
                    <i class="fa fa-trash" aria-hidden="true">Remove</i>
                  </a>
                  <a @click="update()" class="pointer px-2">
                    <i class="fa fa-pencil-square-o" aria-hidden="true">Edit</i>
                  </a>
                </div>
              </div>
            </div>
            <div class="hdivider"></div>
            <ul>
              <li>
                <span>
                  <i class="fa fa-envelope pr-2"></i>
                  {{viewData.email}}
                </span>
              </li>
              <li>
                <span>
                  <i class="fa fa-phone pr-2"></i>
                  {{viewData.contact}}
                </span>
              </li>
              <li>
                <span>
                  <i class="fa fa-text-width pr-2"></i>
                  {{viewData.type}}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="new-create">
      <i class="fa fa-plus-circle pointer" @click="create"></i>
    </div>
    <div v-if="show">
      <ViewContect :contact="showData" @finalModified="modified" @finalCreation="finalCreation" />
    </div>
  </div>
</template>

<script>
import contactService from "@/services/ContactService";
import ViewContect from "../components/contact-create-view/index";
import { isNullOrUndefined } from "util";

export default {
  name: "ContactList",
  data() {
    return {
      contacts: [],
      all: [],
      viewData: null,
      showData: null,
      show: false,
      search: ""
    };
  },
  components: {
    ViewContect
  },
  created() {
    // console.log(this.$route);
    // this.$router.push('/')
  },
  mounted() {
    this.loadData();
  },
  methods: {
    modified(newData) {
      this.viewData = newData;
      this.show = false;
    },
    finalCreation() {
      this.loadData();
      this.show = false;
    },
    view(index) {
      this.viewData = this.contacts[index];
    },
    async loadData() {
      try {
        this.contacts = await contactService.getContacts();
        this.all = this.contacts;
        if (this.contacts.length != 0) {
          this.viewData = this.contacts[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    create: function() {
      this.showData = {
        timer: Date.now(),
        contact: null
      };
      this.show = true;
    },
    update: function() {
      this.showData = {
        timer: Date.now(),
        contact: this.viewData
      };
      this.show = true;
    },
    remove: async function() {
      if (confirm("Are you sure to delete contact?")) {
        try {
          await contactService.removeContact(this.viewData.contactid);
          this.contacts = this.contacts.filter(
            contact => contact.contactid !== this.viewData.contactid
          );
          if (this.contacts.length != 0) {
            this.viewData = this.contacts[0];
          } else {
            this.viewData = [];
          }
        } catch (error) {}
      }
    }
  },
  watch: {
    search: function() {
      this.contacts = this.all.filter(row =>
        row.firstname.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.action {
  font-size: 15px;
}
.new-create {
  font-size: 45px;
  position: fixed;
  right: 60px;
  bottom: 40px;
  color: #42b983;
}
.hdivider {
  margin-top: 50px;
  border-bottom: solid 1px #eaf0f5;
}
.block {
  display: flex;
  flex-direction: row;
}
.contect-list {
  width: 30%;
}

.list {
  height: 380px;
  overflow-y: scroll;
}

.contect-content {
  width: 67%;
  margin-left: 40px;
  height: fit-content;
  min-height: 300px;
  max-height: 500px;
  overflow-y: scroll;
}
#data {
  font-size: 34px;
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

.pointer {
  cursor: pointer;
}

li:last-child {
  border: none;
}

.no-image {
  display: inline-block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-weight: 500;
  border-radius: 50%;
  background-color: #deece0;
  text-align: center;
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

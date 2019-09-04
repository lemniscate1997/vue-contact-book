import Vue from "vue";
import Router from "vue-router";
// import multiguard from 'vue-router-multiguard';
import Home from "./views/Home.vue";

import authGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "login",
            component: () =>
                import ("./views/Login.vue"),
        },
        {
            path: "/register",
            name: "signup",
            component: () =>
                import ("./views/SignUp.vue"),
        },
        {
            path: "/login",
            redirect: "/"
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            beforeEnter: authGuard
        },
        {
            path: "/contact-list",
            name: "contact-list",
            // route level code-splitting
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("./views/ContactList"),
            beforeEnter: authGuard
                // beforeEnter: multiguard([authGuard])
        }
    ]
});
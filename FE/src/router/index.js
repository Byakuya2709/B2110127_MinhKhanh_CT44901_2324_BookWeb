import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/login",
                name: "Login",
                component: () => import("../views/Login.vue")

            },
            {
                path: "/register",
                name: "Register",
                component: () => import("../views/Register.vue")

            },
        ]
    },

    {
        path: "/manager",
        name: "Manager",
        component: () => import("../views/Manager.vue"),
        children: [
            {
                path: "publisher",
                name: "Publisher",
                component: () => import("../views/Publisher.vue"),

            },
            {
                path: "publisher/edit/:id",
                name: "EditPublisher",
                component: () => import("../views/EditPublisher.vue")
            },
        ]
    }


];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
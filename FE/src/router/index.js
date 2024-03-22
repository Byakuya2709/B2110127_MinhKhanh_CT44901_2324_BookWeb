import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/api/login",
                name: "Login",
                component: () => import("../views/Login.vue")

            },
            {
                path: "/api/register",
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
                path: "book",
                name: "NewBook",
                component: () => import("../views/Book/NewBook.vue"),

            },
            {
                path: "publisher",
                name: "Publisher",
                component: () => import("../views/Publisher/Publisher.vue"),

            },
            {
                path: "publisher/edit/:id",
                name: "EditPublisher",
                component: () => import("../views/Publisher/EditPublisher.vue")
            },
            {
                path: "publisher/new",
                name: "NewPublisher",
                component: () => import("../views/Publisher/NewPublisher.vue")
            },
        ]
    }


];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
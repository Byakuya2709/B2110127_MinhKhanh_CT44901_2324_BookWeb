import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/",
                name: "Landing",
                component: () => import("../components/Landing.vue")

            },
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
            {
                path: "/:pathMatch(.*)*",
                name: "Notfound",
                component: () => import("../views/NotFound.vue"),
            },
        ]

    },

    {
        path: "/user",
        name: "User",
        component: () => import("../views/User.vue"),
        children: [
            {
                path: "profile",
                name: "Profile",
                component: () => import("../views/Profile.vue"),

            },

            {
                path: "book",
                name: "Book",
                component: () => import("../views/Book/Book.vue"),

            },
            {
                path: "book/:id",
                name: "BookView",
                component: () => import("../views/BookView.vue"),

            },
            {
                path: "book/borrow/:id",
                name: "BookBorrow",
                component: () => import("../views/BookBorrow.vue"),

            },
            {
                path: "book/borrow/manager/:id",
                name: "BorrowManaga",
                component: () => import("../views/BorrowManaga.vue"),

            },
        ]
    }


];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
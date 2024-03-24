import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/api/loginadmin",
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
        path: "/manager",
        name: "Manager",
        component: () => import("../views/Manager.vue"),
        children: [
            {
                path: "book/new",
                name: "NewBook",
                component: () => import("../views/Book/NewBook.vue"),

            },
           
            {
                path: "book",
                name: "Book",
                component: () => import("../views/Book/Book.vue"),

            },
            {
                path: "book/edit/:id",
                name: "EditBook",
                component: () => import("../views/Book/EditBook.vue")
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
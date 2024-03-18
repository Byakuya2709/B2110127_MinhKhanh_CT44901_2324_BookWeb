<template>
    <div class="login bg-gray-200 dark:bg-black">
      <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
      <div class="flex justify-center items-center h-full">
        <div class="flex max-w-4xl mt-20">
          <div class="bg-white p-8 w-full lg:w-1/2">
            <h1 class="text-gray-700 text-3xl text-center">Login</h1>
            <form @submit.prevent = "loginUser">
              <div class="my-3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  class="border border-gray-300 rounded w-full py-2 px-4  focus:shadow-outline"
                />
                <p v-if="!validated.email" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập email hợp lệ.</p>
              </div>
              <div class="my-3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật Khẩu</label>
                <input
                  autocomplete="off"
                  required
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  class="border border-gray-300 rounded w-full py-2 px-4  focus:shadow-outline"
                />
                <p v-if="!validated.password" class="px-4 text-red-500 text-sm mt-1">Mật khẩu phải gồm ít nhât chữ thường, số và  không được dưới 8 kí tự .</p>
              </div>
              <!-- <div class="my-3 flex justify-between sm:flex-col lg:flex-row">
                <label for=""><input type="checkbox" />Remember Me</label>
                <a href="#" class="text-blue-400">Forgot Email or Password?</a>
              </div> -->
              <div class="my-3 flex justify-center items-center">
                <input
                type="submit"
                 @submit="loginUser"
                  value="Login"
                  class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25"
                  :disabled="!isValidated"
                />
              </div>
            </form>
          </div>
          <div class="w-1/2 hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1534531688091-a458257992cb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWVtb3JpZXN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60"
              class="w-full h-full"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import Alert from '../components/Alert.vue'
  export default {
    name: "Login",
    components: {
    Alert,
  },
    data() {
      return {
        email: "",
        password: "",
        validated: [],
        alert: {
          show: false,
          type: '',
          message: '',
        },
      };
    },
    watch:{
      email (value){
        this.validateEmail(value);
      },
      password(value){
      this.validatePassword(value);
    },
    },
    computed:{
      isValidated() {
      return this.validated.email && this.validated.password;
    },
    },
    methods: {
      ...mapActions(["login"]),
      async loginUser() {

        try {
          const user = {
            email: this.email,
            password: this.password,
          };
           const res = await this.login(user);
          if (res.status == 201) {
            this.showAlert('Success', res.data.message+" . Đang chuyển sang trang người dùng");
            setTimeout(() => {
              this.$router.push('/manager');
            }, 2000);
          }
          else if (res.response.status==404) {
            this.showAlert('Info', res.response.data.message);
          } 
          else if (res.response.status==401) {
            this.showAlert('Info', res.response.data.message);
          } 
          else {
            this.showAlert('Error', 'Lỗi không xác định!!!')
          }
          
        } catch (error) {
          console.log(res)
          this.showAlert('Error', 'Lỗi không xác định!!!');
        }
      },
      validateEmail(value) {
        this.validated['email'] = /.+@.+\.(com|vn)$/.test(value);
        console.log(this.validated['email']);
      },
      validatePassword(value) {
        this.validated['password'] =/^(?=.*[a-z])(?=.*\d).{8,}$/.test(value);
        
      },
      showAlert(type, message) {
      this.alert = {
        show: true,
        type: type,
        message: message,
      }
    },
    hideAlert(){
      this.alert.show=false;
    }
    },
  };
  </script>
  
  <style>
  </style>
  
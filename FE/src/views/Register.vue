<template>
    <div class="register bg-gray-200 dark:bg-black">
      <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
      <div class="flex justify-center items-center h-full">
        <div class="flex max-w-4xl mt-20">
          <div class="bg-white w-full lg:w-1/2 p-8">
            <h1 class="text-gray-700 text-3xl text-center">Sign Up</h1>
            <form @submit.prevent="registerUser">
              <div class="my-3">
                <input
                  type="text"
                  placeholder="Username"
                  v-model="userName"
                  class="border-rounded w-full py-2 px-4 outline-none focus:shadow-outline"
                />
                <p v-if="!validated.userName" class="px-4 text-red-500 text-sm mt-1">Tên người dùng không được dưới 6 kí tự.</p>
              </div>
              <div class="my-3">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  autocomplete="off"
                  class="border-rounded w-full py-2 px-4 outline-none focus:shadow-outline"
                />
              </div>
              <p v-if="!validated.email" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập email hợp lệ.</p>
              <div class="my-3">
                <input
                  required
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  class="border-rounded w-full py-2 px-4 outline-none focus:shadow-outline"
                />
                <p v-if="!validated.password" class="px-4 text-red-500 text-sm mt-1">Mật khẩu phải gồm ít nhât chữ thường, số và  không được dưới 8 kí tự .</p>
       
              </div>
              <div class="my-3">
                <input
                  required
                  type="password"
                  placeholder="Password"
                  v-model="password_confirm"
                  class="border-rounded w-full py-2 px-4 outline-none focus:shadow-outline"
                  :disabled="!validated.password"
                />
                <div v-if="validated.password">
                  <p v-if="!validated.passwordConfirm" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập đúng lại mật khẩu đẫ nhập.</p>
                </div>
              </div>
              <div class="my-3 flex justify-center items-center">
                <input
                  type="submit"
                  value="Register"
                  @submit="registerUser"
                  class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25"
                  :disabled="!isValidated"
                />
              </div>
            </form>
            <div class="my-3 flex justify-center items-center">
              <p class="text-gray-800 text-sm">Already have an Account?</p>
              <a href="/login" class="text-blue-400">Login</a>
            </div>
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
  import {mapActions} from 'vuex'
  import Alert from '../components/Alert.vue'
  
  export default {
    name: "Register",
    components: {
    Alert,
  },
  
    data() {
      return {
        userName: "",
        email: "",
        password: "",
        password_confirm: "",
        validated: [],
        
        alert: {
          show: false,
          type: '',
          message: '',
        },
      };
    },
    watch:{
      userName(value){
        this.validateUserName(value);
      },
      email (value){
        this.validateEmail(value);
      },
      password(value){
      this.validatePassword(value);
    },
    password_confirm(value){
      this.validatePasswordConfirm(value);
    }

    },
    computed:{
      isValidated() {
      return this.validated.userName && this.validated.email && this.validated.password && this.validated.passwordConfirm ;
    },
    },
   
    methods: {
      ...mapActions(["register"]),
      async registerUser(){
        console.log(this.userName, this.email, this.password, this.password_confirm);
        try {
          const user = {
            name: this.userName,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm
          }
  
          let res = await this.register(user);
          console.log(res.data)
          if(res.data.message=="userexists"){
          this.showAlert('Info', `Tài khoản này đã tồn tại`);
           setTimeout(() => {
            this.hideAlert();
            }, 3000);
            return; 
          }
          
          if(res.data.message=="sucessfully"){
            this.showAlert('Success', 'Đăng nhập thành công. Đang chuyển hướng trang');
            
            setTimeout(() => {
            this.$router.push('/');
           }, 2000);
          }
          else {
            console.error('Registration failed:', res.data.error);
    }
        } catch (error) {
          console.log(error)
        }
      },
      validateEmail(value) {
        this.validated['email'] = /.+@.+\.(com|vn)$/.test(value);
        console.log(this.validated['email']);
      },
      validatePassword(value) {
        this.validated['password'] =/^(?=.*[a-z])(?=.*\d).{8,}$/.test(value);
        
      },
      validatePasswordConfirm(value) {
        if(this.password!= value)
          this.validated['passwordConfirm'] = false;
        else this.validated['passwordConfirm'] = true;
      },
      validateUserName(value) {
        if (value.length < 6)
          this.validated['userName'] = false;
        else this.validated['userName'] = true;
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
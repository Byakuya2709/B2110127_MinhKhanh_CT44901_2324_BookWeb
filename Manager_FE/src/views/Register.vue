<template>
  <div class="register bg-gray-200 dark:bg-black">
    <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
    <div class="flex justify-center items-center h-full">
      <div class="flex mt-10 mb-10">
        <div class="bg-white w-full lg:w-1/2 p-8">
          <h1 class="text-gray-700 text-3xl text-center">Đăng Ký</h1>
          <form @submit.prevent="registerUser" ref="registerForm">
            <div class="my-2">
              <label for="fullname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và Tên</label>
              <input
                required
                id="fullname"
                type="text"
                placeholder="Tên đầy đủ..."
                v-model="fullname"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.fullname" class="px-4 text-red-500 text-sm mt-1">Tên người dùng không được dưới 6 kí tự.</p>
            </div>
            <div class="my-2">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                id="email"
                required
                type="email"
                placeholder="Email"
                v-model="email"
                autocomplete="off"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.email" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập email hợp lệ.</p>
            </div>
            <div class="my-2">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
              <input
              id="password"
                required
                type="password"
                placeholder="Mật khẩu..."
                v-model="password"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.password" class="px-4 text-red-500 text-sm mt-1">Mật khẩu phải gồm ít nhất 8 kí tự bao gồm chữ thường/HOA và 1 số.</p>
            </div>
            <div class="my-2">
              <label for="password_confirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
              <input
              id="password_confirm"
                required
                type="password"
                placeholder="Nhập lại mật khẩu"
                v-model="password_confirm"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
                :disabled="!validated.password"
              />
              <div v-if="validated.password">
                <p v-if="!validated.passwordConfirm" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập đúng lại mật khẩu đã nhập.</p>
              </div>
            </div>

          <div class="grid md:grid-cols-2  md:gap-2">
            <div class="my-2">
              <label for="birth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày/Tháng/Năm sinh</label>
              <input
              id="birth"
                required
                type="date"
                placeholder="Ngày sinh"
                v-model="birth"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.birth" class="px-4 text-red-500 text-sm mt-1">Vui lòng nhập ngày sinh.</p>
            </div>
           
            <div class="my-2">
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input
              required
              id="address"
                type="text"
                placeholder="Address"
                v-model="address"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.address" class="px-4 text-red-500 text-sm mt-1">Địa chỉ không được dưới 6 kí tự</p>
            </div>
            <div class="my-2">
              <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
              <select id="gender" v-model="gender" class="border border-gray-300 rounded w-full py-2 px-2 focus:ring-3 focus:ring-blue-300 ">
                <option value="" disabled selected>Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
              <p v-if="!validated.gender" class="px-4 text-red-500 text-sm mt-1">Vui lòng chọn giới tính</p>
            </div>
          </div>
            <div class="my-2 flex justify-center items-center">
              <input
                type="submit"
                value="Register"
                @submit="registerUser"
                class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25"
                :disabled="!isValidated"
              />
              <button type="button" @click="resetForm" class="rounded-full bg-gray-600 border-gray-600 px-8 py-2 text-white mx-8 hover:bg-red-800">Xóa</button>
            </div>
          </form>
          <div class="my-2 flex justify-center items-center">
            <p class="text-gray-800 text-sm">Đã có tài khoản?</p>
            <router-link to="/login" class="text-blue-400">Đăng Nhập</router-link>
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
      fullname: "",
      email: "",
      birth: "",
      password: "",
      password_confirm: "",
      address: "",
      gender: "",
      validated: [],
      
      alert: {
        show: false,
        type: '',
        message: '',
      },
    };
  },
  watch:{
    fullname(value){
      this.validateFullname(value);
    },
    email (value){
      this.validateEmail(value);
    },
    password(value){
    this.validatePassword(value);
  },
  password_confirm(value){
    this.validatePasswordConfirm(value);
  },
  birth(value){
    this.validateBirth(value);
  },
  address(value){
    this.validateAddress(value);
  },
  gender(value){
    this.validateGender(value);
  }

  },
  computed:{
    isValidated() {
    return this.validated.fullname && this.validated.email && this.validated.password && this.validated.passwordConfirm && this.validated.birth && this.validated.address && this.validated.gender;
  },
  },
 
  methods: {
    ...mapActions(["register"]),
    async registerUser(){
      // console.log(this.fullname, this.email, this.birth, this.password, this.password_confirm, this.address, this.gender);
      try {
        const user = {
          fullname: this.fullname,
          email: this.email,
          birth: this.birth,
          password: this.password,
          password_confirm: this.password_confirm,
          address: this.address,
          gender: this.gender
        }

        let res = await this.register(user);
        console.log(res)
        if (res.status == 201) {
            this.showAlert('Success', res.data.message+" . Đang chuyển sang trang đăng nhập");
            setTimeout(() => {
              this.$router.push('/api/loginadmin');
            }, 2000);
          }
          else if (res.response.status==409) {
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
    validatePasswordConfirm(value) {
      if(this.password!= value)
        this.validated['passwordConfirm'] = false;
      else this.validated['passwordConfirm'] = true;
    },
    validateFullname(value) {
      if (value.length < 6)
        this.validated['fullname'] = false;
      else this.validated['fullname'] = true;
    },
    validateBirth(value) {
      this.validated['birth'] = value !== '';
    },
    validateAddress(value) {
      this.validated['address'] = value.length >= 6;
    },
    validateGender(value) {
      this.validated['gender'] = value !== '';
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
  },
  resetForm() {
      this.$refs.registerForm.reset();
      this.fullname = "";
      this.email = "";
      this.password = "";
      this.address = "";
      this.gender = "";
      this.password_confirm = "";
      this.birth = "";
      this.validated = {
        fullname: false,
        email: false,
        password: false,
        address: false,
        birth: false,
        gender: false,
        password_confirm: false,
      };
    },
  },
   
    
};
</script>

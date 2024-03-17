<template>
  <div class="Chỉnh Sữa bg-gray-200 dark:bg-black">
    <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
    <div class="flex justify-center items-center h-full">
      <div class="flex max-w-4xl mt-20">
        <div class="bg-white p-8 w-full lg:w-1/2">
          <h1 class="text-gray-700 text-3xl text-center">Chỉnh Sữa</h1>
          <form @submit.prevent="editPublisher">
            <div class="my-3">
              <input
                type="text"
                placeholder="publisherName"
                v-model="publisherName"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
              />
              <p v-if="!validated.publisherName" class="px-4 text-red-500 text-sm mt-1">Tên nhà xuất bản không được dưới 8 kí tự.</p>
            </div>
            <div class="my-3">
              <input
                autocomplete="off"
                required
                type="text"
                placeholder="address"
                v-model="address"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
              />
              <p v-if="!validated.address" class="px-4 text-red-500 text-sm mt-1">Địa chỉ không được dưới 8 kí tự.</p>
            </div>
            <div class="my-3 flex justify-center items-center">
              <input
                type="submit"
                value="Chỉnh Sữa"
                class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25"
                :disabled="!isValidated"
              />
            </div>
          </form>
        </div>
        <div class="bg-white p-8 w-full lg:w-1/2 ">
        <div class="card bg-white shadow-md rounded-md p-6 mb-4">
          <h2 class="text-xl font-semibold">{{ publisher.publisherName }}</h2>
            <p class="text-gray-600">Address: {{ publisher.address }}</p>
      
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/Alert.vue'
import { api } from '../BookApp/Api';

export default {
  name: "EditPublisher",
  components: {
   
    Alert,
  },
  data() {
    return {
      publisher: {},
      publisherName: "",
      address: "",
      validated: {
        publisherName: false,
        address: false
      },
      alert: {
        show: false,
        type: '',
        message: '',
      },
    };
  },
  watch: {
    publisherName(value) {
      this.validatePublisherName(value);
    },
    address(value) {
      this.validateAddress(value);
    },
  },
  mounted() {
    this.retrieve();
  },
  computed: {
    isValidated() {
      return this.validated.publisherName && this.validated.address;
    },
  },
  methods: {
    async retrieve() {
      try {
        const response = await api.get(`/manager/publisher/${this.$route.params.id}`);
        this.publisher = response.data;
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    },
    async editPublisher() {
      try {
        const publisherData = {
          publisherName: this.publisherName,
          address: this.address,
        };
        const response = await api.post(`/manager/publisher/update/${this.$route.params.id}`,publisherData);
        console.log(response.data.message)
        if (response.status==201){
          this.showAlert('Success', `Cập nhật thành công`);
           setTimeout(() => {
            this.hideAlert();
            this.$router.push('/manager/publisher');
            }, 2000);
           
        }
      } catch (error) {
        this.showAlert('Error',error.response.data.message);
        }
    },
    validatePublisherName(value) {
      this.validated['publisherName'] =  this.validated.publisherName = value.length >= 5;
    },
    validateAddress(value) {
      this.validated['address'] =  this.validated.address = value.length >= 5;
    },
    showAlert(type, message) {
      this.alert = {
        show: true,
        type: type,
        message: message,
      }
    },
    hideAlert() {
      this.alert.show = false;
    }
  },
};
</script>

<style>
/* Add your styles here */
</style>

<template>
    <div class="bg-gray-200 dark:bg-black">
      <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
      <div class="flex justify-center items-center h-full">
        <div class="flex max-w-4xl mt-20">
          <div class="bg-white p-8 w-full ">
            <h1 class="text-gray-700 text-3xl text-center">Chỉnh sửa sách</h1>
            <form @submit.prevent="editBook">
              <!-- title -->
              <div class="my-3">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Sách</label>
                <input
                id="title"
                required
                  type="text"
                  placeholder="Tên Sách"
                  v-model="title"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                />
                <p v-if="!validated.title" class="px-4 text-red-500 text-sm mt-1">Tên sách không được dưới 6 kí tự.</p>
              </div>
              <!-- price -->
              <div class="my-3">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
                <input
                id="price"
                  autocomplete="off"
                  required
                  :min="1000"
                  type="number"
                  placeholder="Giá (VND)"
                
                  v-model="price"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                />
                <p v-if="!validated.price" class="px-4 text-red-500 text-sm mt-1">Số tiền phải là số nguyên dương và lớn hơn 1.000 VND.</p>
              </div>
              <!--  -->
            <div class="grid md:grid-cols-2  md:gap-2">
              <!-- NXB -->
              <div class="my-2">
                <label for="publisher" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhà xuất bản</label>
                <select
                    required
                    id="publisher"
              
                   placeholder="Nhà xuất bản"
                    v-model="publisher"
                    class="border border-gray-300 rounded w-full py-2 px-2 focus:ring-3 focus:ring-blue-300"
                  >
                  <option value="" disabled selected>Chọn nhà xuất bản</option>
                  <option v-for="nxb in nxbs"  :key="nxb.publisherName" :value="nxb.publisherName">{{ nxb.publisherName }}</option>
                  </select>
              <p v-if="!validated.publisher" class="px-4 text-red-500 text-sm mt-1">Vui lòng chọn nhà xuất bản</p>
            </div>
            <!-- Ngày XB -->
             <div class="my-2">
              <label for="publicationDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Phát Hành</label>
              <input
              id="publicationDate"
                required
                type="date"
                placeholder="Ngày Phát Hành"
                v-model="publicationDate"
                class="border border-gray-300 rounded w-full py-2 px-4 focus:ring-3 focus:ring-blue-300"
              />
              <p v-if="!validated.publicationDate" class="px-4 text-red-500 text-sm mt-1">Vui lòng chọn ngày phát hành sách.</p>
            </div>
           
           <!-- so luong -->
            <div class="my-2">
              <label for="available" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng</label>
                <input
                  id="available"
                  required
                  type="number"
                  placeholder="Số lượng"
                  :min="1"
                  :max="10"
                  v-model="available"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                />
              
              <p v-if="!validated.available" class="px-4 text-red-500 text-sm mt-1">Vui lòng số lượng sách</p>
            </div>
            </div>
              <div class="my-3 flex justify-center items-center">
                <input
                  type="submit"
                  value="Chỉnh Sửa"
                  class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25"
                  :disabled="!isValidated"
                />
            
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Alert from '../../components/Alert.vue'
  import { api } from '../../BookApp/Api';
  
  export default {
    name: "EditBook",
    components: {
      Alert,
    },
    data() {
      return {
        nxbs:[],
        title: "",
        price: "",
        publisher:"",
        publicationDate:"",
        available:"",
        validated: {
          title: false,
          price: false,
          publisher:false,
          publicationDate:false,
          available:false,
        },
        alert: {
          show: false,
          type: '',
          message: '',
        },
      };
    },
    watch: {
      title(value) {
        this.validatebookName(value);
      },
      price(value) {
        this.validatePrice(value);
      },
      publisher(value) {
        this.validatePublisher(value);
      },
      publicationDate(value) {
        this.validatePublicationDate(value);
      },
      available(value) {
        this.validateAvailable(value);
      },
    },
    computed: {
      isValidated() {
        return this.validated.title && this.validated.price && this.validated.publisher && this.validated.publicationDate && this.validated.available;
      },
    },
    mounted() {
    this.retrieve();
    this.fetchPublishers();
  },
    methods: {
    async retrieve() {
        try {
        const response = await api.get(`/manager/book/${this.$route.params.id}`);
        console.log(response)
        this.title = response.data.title;
        this.price = response.data.price;
        this.publisher = response.data.publisher;
        this.available =response.data.available;
         this.publicationDate = response.data.publicationDate;

      } catch (error) {
        console.error('Error fetching Books:', error);
      }
    },
      async fetchPublishers() {
      try {
        const response = await api.get('/manager/publisher');
        this.nxbs = response.data;
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    },

    async editBook() {
      try {
        const bookData = {
          title: this.title,
          price: this.price,
          publisher:this.publisher,
          publicationDate:this.publicationDate,
          available:this.available,
        };
        const response = await api.post(`/manager/book/update/${this.$route.params.id}`,bookData);
        console.log(response.data.message)
        if (response.status==201){
          this.showAlert('Success', `Cập nhật thành công`);
           setTimeout(() => {
            this.hideAlert();
            this.$router.push('/manager/book');
            }, 2000);
           
        }
      } catch (error) {
        this.showAlert('Error',error.response.data.message);
        }
    },
      
      validatebookName(value) {
        this.validated['title'] =  this.validated.title = value.length >= 6;
      },
      validatePublicationDate(value) {
        this.validated['publicationDate'] = value !== '';
      },
      validatePublisher(value) {
        this.validated['publisher'] = value !== '';
      },
      validateAvailable(value) {
        this.validated['available'] = value >0;
      },
      validatePrice(value) {
        this.validated['price'] = value > 0;
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
      },
      // reset form
      resetForm() {
      this.$refs.bookForm.reset();
      this.title = "";
      this.price = "";
      this.publisher = "";
      this.publicationDate = "";
      this.available = "";
      this.validated = {
        title: false,
        price: false,
        publisher: false,
        publicationDate: false,
        available: false,
      };
    },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  
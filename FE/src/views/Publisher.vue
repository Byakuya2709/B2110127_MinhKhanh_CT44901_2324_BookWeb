<template>
  <div class="">
    <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
    <Search   @search="handleSearch" @clearSearch="clearSearchInput"/>
    <div v-if="filteredPublishers.length > 0 ">
      <PublisherCard
        v-for="publisher in filteredPublishers"
        :key="publisher._id"
        :publisher="publisher"
        @edit-publisher="editPublisher"
        @delete-publisher="deletePublisher"
      />
    </div>
    <div v-else>
      <p>No publishers found.</p>
    </div>
    <div>
      <RouterView  />
    </div>

  </div>
</template>

<script>
import { api } from '../BookApp/Api';
import PublisherCard from "../components/CardPublisher.vue";
import Search from '../components/Search.vue';
import Alert from '../components/Alert.vue'

export default {
  components: {
    PublisherCard,
    Search,
    Alert
  },
  data() {
    return {
      publishers: [],
      searchTerm: '', 

      alert: {
        show: false,
        type: '',
        message: '',
      },
    };
  },
  async created() {
    await this.fetchPublishers();
  },
  computed: {
    filteredPublishers() {
      if (!this.searchTerm) {
        return this.publishers;
      }

      return this.publishers.filter(publisher => {
        return publisher.publisherName.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
      });
    },
  },
  methods: {

    async fetchPublishers() {
      try {
        const response = await api.get('/manager/publisher');
        this.publishers = response.data;
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    },
    async editPublisher(publisher) {
      try {
        // Redirect to the edit page with the publisher ID
        // Assuming you have a route for editing a publisher
        this.$router.push({ name: 'EditPublisher', params: { id: publisher._id } });
      } catch (error) {
        console.error('Error editing publisher:', error);
      }
    },
    async deletePublisher(publisher) {
      try {
        const confirmDelete = confirm('Bạn có chắc chấn muốn xóa nhà xuất bản này');
        if (!confirmDelete) return;
        
       const response= await api.delete(`/manager/publisher/${publisher._id}`);
        if(response.data.message=="success"){
          this.showAlert('Success', 'Xóa thành công');
          setTimeout(() => {
            this.hideAlert();
         }, 2000);
        this.publishers = this.publishers.filter(p => p._id !== publisher._id);
      } }catch (error) {
        console.error('Error deleting publisher:', error);
      }
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    clearSearchInput() {
      this.searchTerm = '';
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

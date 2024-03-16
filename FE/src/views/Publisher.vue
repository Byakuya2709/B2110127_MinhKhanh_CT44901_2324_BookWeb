<template>
  <div>
    <Search   @search="handleSearch" @clearSearch="clearSearchInput"/>
    <!-- <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Refesh
    </button> -->
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

export default {
  components: {
    PublisherCard,
    Search
  },
  data() {
    return {
      publishers: [],
      searchTerm: '', 

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
        this.activated=false;
        this.$router.push({ name: 'EditPublisher', params: { id: publisher._id } });
      } catch (error) {
        console.error('Error editing publisher:', error);
      }
    },
    async deletePublisher(publisher) {
      try {
        const confirmDelete = confirm('Are you sure you want to delete this publisher?');
        if (!confirmDelete) return;

        // Call API to delete the publisher
        await api.delete(`/mangager/publisher/${publisher._id}`);

        // Remove the deleted publisher from the local list
        this.publishers = this.publishers.filter(p => p._id !== publisher._id);
      } catch (error) {
        console.error('Error deleting publisher:', error);
      }
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    clearSearchInput() {
      this.searchTerm = '';
    },
 
  },
};
</script>

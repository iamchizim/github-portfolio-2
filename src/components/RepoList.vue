<template>
  <section>
    <search-filter @search="handleSearch" @filter="handleFilter"/>
    <div v-if="error" class="error" role="alert">{{ error }}</div>
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-if="!loading" role="list">
      <li v-for="repo in filteredRepos" :key="repo.id">
        <router-link :to="{ name: 'Repository', params: { name: repo.name } }" :aria-label="'View details for ' + repo.name">{{ repo.name }}</router-link>
      </li>
    </ul>
    <button @click="fetchRepos" aria-label="Load more repositories">Load More</button>
  </section>
</template>

<script>
import axios from 'axios';
import SearchFilter from './SearchFilter.vue';

export default {
  name: 'RepoList',
  components: {
    SearchFilter,
  },
  data() {
    return {
      repos: [],
      loading: false,
      error: null,
      page: 1,
      searchQuery: '',
      filterLanguage: '',
    };
  },
  computed: {
    filteredRepos() {
      return this.repos.filter(repo => {
        return repo.name.includes(this.searchQuery) && 
               (this.filterLanguage === '' || repo.language === this.filterLanguage);
      });
    },
  },
  methods: {
    async fetchRepos() {
      this.loading = true;
      try {
        const response = await axios.get(`https://api.github.com/users/${process.env.VUE_APP_GITHUB_USERNAME}/repos`, {
          params: {
            per_page: 20,
            page: this.page,
          },
        });
        this.repos = this.repos.concat(response.data);
        this.page += 1;
      } catch (error) {
        this.error = 'Failed to load repositories';
      } finally {
        this.loading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    handleFilter(language) {
      this.filterLanguage = language;
    },
  },
  created() {
    this.fetchRepos();
  },
};
</script>

<style scoped>
.error {
  color: #d32f2f;
}

.loading {
  font-weight: bold;
}
</style>

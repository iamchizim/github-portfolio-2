<template>
  <section>
    <h2>Repository Details</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error" role="alert">{{ error }}</div>
    <div v-if="repo" class="repo-details">
      <h3>{{ repo.name }}</h3>
      <p>{{ repo.description }}</p>
      <p v-if="repo.language">Language: {{ repo.language }}</p>
      <p>Stars: {{ repo.stargazers_count }}</p>
      <p>Forks: {{ repo.forks_count }}</p>
      <p>Created: {{ formatDate(repo.created_at) }}</p>
      <p>Updated: {{ formatDate(repo.updated_at) }}</p>
      <p>URL: <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a></p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RepositoryPage',
  data() {
    return {
      repo: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchRepoDetails() {
      this.loading = true;
      try {
        const response = await axios.get(`https://api.github.com/repos/${process.env.VUE_APP_GITHUB_USERNAME}/${this.$route.params.name}`);
        this.repo = response.data;
      } catch (error) {
        this.error = 'Failed to load repository details';
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
  },
  created() {
    this.fetchRepoDetails();
  },
};
</script>

<style scoped>
.repo-details {
  margin-top: 20px;
}

.error {
  color: var(--error-color);
}

.loading {
  font-weight: bold;
}
</style>

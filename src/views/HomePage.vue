<template>
  <main>
    <h1>My GitHub Repositories</h1>
    <RepoList />
  </main>
</template>

<script>
import RepoList from '@/components/RepoList.vue';

export default {
  name: 'HomePage',
  components: {
    RepoList,
  },
};
</script>

<template>
  <form role="search" aria-label="Search and Filter Repositories">
    <input type="text" placeholder="Search" @input="updateSearch" aria-label="Search repositories" />
    <select @change="updateFilter" aria-label="Filter by language">
      <option value="">All Languages</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Python">Python</option>
      <option value="Java">Java</option>
    </select>
  </form>
</template>

<script>
export default {
  methods: {
    updateSearch(event) {
      this.$emit('search', event.target.value);
    },
    updateFilter(event) {
      this.$emit('filter', event.target.value);
    },
  },
};
</script>

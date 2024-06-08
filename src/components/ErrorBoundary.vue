<template>
  <main role="main">
    <h1>An error occurred</h1>
    <p>{{ error }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  errorCaptured(err) {
    this.error = err.toString();
    return false;
  },
};
</script>

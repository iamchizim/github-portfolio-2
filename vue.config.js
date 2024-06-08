
module.exports = {
  // Production-specific configuration options
  configureWebpack: {
    optimization: {
      minimize: true, // Minimize the code
      splitChunks: {
        chunks: 'all', // Split chunks for better caching
      },
    },
  },
};

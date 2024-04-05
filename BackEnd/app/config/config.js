const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore",
  },
  ACCESS_TOKEN_SECRET: {
    token:process.env.MONGODB_URI ||  "0f185805165a7a24fe27cc2b1b933cdd7b22aa56e95238e83495597b16e481d3",
  },
}

module.exports = config;

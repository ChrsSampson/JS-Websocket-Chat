const path = require("path");

module.exports = {
  root: "./client",
  mode: "development",
  build: {
    outDir: path.join(__dirname + "/static"),
    watch: {},
  },
};

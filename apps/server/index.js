const app = require("./src/app");

app.listen(process.env.PORT || 4999, () => {
  console.log("Server started!");
});

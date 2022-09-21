import app from "./src/app.js";

app.listen(process.env.PORT || 4999, () => {
  console.log("Server started!");
});

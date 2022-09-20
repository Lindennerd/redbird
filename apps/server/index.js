import app from "./src/app.js";
import apolloServer from "./src/apollo-server.js";

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["https://studio.apollographql.com"],
      credentials: true,
    },
  });

  app.listen(process.env.PORT || 4999, () => {
    console.log("Server started!");
  });
});

import app from "./src/app.js";
import apolloServer from './src/apollo-server.js';

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({app});

  app.listen(process.env.PORT || 4999, () => {
    console.log("Server started!");
  });
})

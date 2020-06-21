import express from "express";
import { server } from "./graphql";
import { banner } from "./banner";
import { logger } from "./logger";
import { secure } from "./security";

const app = express();
app.set("trust proxy", true);

app.use(logger);

secure(app);

server.applyMiddleware({ app });

app.get("/", (_, res) => {
  res.contentType("text/plain").status(200).write(banner);

  res.end();
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

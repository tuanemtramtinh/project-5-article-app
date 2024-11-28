import express, { Request, Response } from "express";
import { connect } from "./configs/database";
import dotenv from "dotenv";
import Article from "./models/article.model";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import cors from "cors";
import bodyParser from "body-parser";
import { requireAuth } from "./middlewares/auth.middleware";

dotenv.config();
const app: any = express();
const port: number = 3000;

connect();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(requireAuth);
  app.use(
    "/",
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer();

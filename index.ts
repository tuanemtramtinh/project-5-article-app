import express, { Request, Response } from "express";
import { connect } from "./configs/database";
import dotenv from "dotenv";
import Article from "./models/article.model";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import cors from "cors";
import bodyParser from "body-parser";

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
  app.use("/", bodyParser.json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer();

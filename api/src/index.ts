import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "./utils/get-user-from-toket";

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const userInfo = getUserFromToken(req.headers.authorization);
    return { prisma, userInfo };
  },
});

server.listen().then(({ url }) => {
  console.log("Server ready on " + url);
});

import { Mutation } from "../mutations";
import { Post } from "./Post";
import { Profile } from "./Profile";
import { Query } from "./Query";
import { User } from "./User";

export const resolvers = {
  Query,
  Mutation,
  Post,
  Profile,
  User,
};

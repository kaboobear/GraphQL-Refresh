import { userLoader } from "../loaders/userLoader";
import { Context } from "../types/context.interface";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: ({ authorId }: PostParentType, _: any, { prisma }: Context) => {
    return userLoader.load(authorId);
  },
};

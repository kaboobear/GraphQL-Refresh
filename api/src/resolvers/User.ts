import { Context } from "../types/context.interface";

interface UserParentType {
  id: number;
}

export const User = {
  posts: ({ id }: UserParentType, _: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
  },
};

import { Context } from "../types/context.interface";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: ({ userId }: ProfileParentType, _: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};

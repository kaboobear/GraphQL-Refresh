import { Post } from "@prisma/client";
import { Context } from "../types/context.interface";

interface PostCreateParams {
  post: {
    title: string;
    content: string;
  };
}

interface PostUpdateParams {
  postId: string;
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | null;
}

export const postResolvers = {
  postCreate: async (
    parent: any,
    { post }: PostCreateParams,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "User doesn't logged in" }],
        post: null,
      };
    }

    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [{ message: "Provide all needed data" }],
        post: null,
      };
    }

    const createPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId,
      },
    });

    return {
      userErrors: [],
      post: createPost,
    };
  },
  postUpdate: async (
    parent: any,
    { post, postId }: PostUpdateParams,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "User doesn't logged in" }],
        post: null,
      };
    }

    const { title, content } = post;
    if (!title) delete post.title;
    if (!content) delete post.content;
    if (!title && !content) {
      return {
        userErrors: [{ message: "Provide some needed data" }],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!existingPost) {
      return {
        userErrors: [{ message: "Post doesn't exit" }],
        post: null,
      };
    }
    if (existingPost.authorId !== userInfo.userId) {
      return {
        userErrors: [{ message: "Access denied" }],
        post: null,
      };
    }

    const updatedPost = await prisma.post.update({
      data: {
        ...post,
      },
      where: {
        id: Number(postId),
      },
    });

    return {
      post: updatedPost,
      userErrors: [],
    };
  },
  postDelete: async (
    parent: any,
    { postId }: { postId: String },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });
    if (!userInfo) {
      return {
        userErrors: [{ message: "User doesn't logged in" }],
        post: null,
      };
    }

    if (!existingPost) {
      return {
        userErrors: [{ message: "Post doesn't exit" }],
        post: null,
      };
    }
    if (existingPost.authorId !== userInfo.userId) {
      return {
        userErrors: [{ message: "Access denied" }],
        post: null,
      };
    }

    const deletedPost = await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return {
      post: deletedPost,
      userErrors: [],
    };
  },
};

import { Post } from "./post.interface";

export interface Profile {
  bio: string;
  isMyProfile: boolean;
  user: {
    posts: Post[];
  };
}

import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    me: User
    profile(userId: ID): Profile
    posts: [Post]
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    signup(input: SignupInput!): AuthPayload!
    signin(input: SigninInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
    user: User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
    createdAt: String!
    profile: Profile!
    posts: [Post]!
  }

  type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    isMyProfile: Boolean!
    user: User
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError!]
    post: Post
  }

  type AuthPayload {
    userErrors: [UserError!]
    token: String
  }

  input PostInput {
    title: String
    content: String
  }

  input SignupInput {
    email: String!
    name: String!
    password: String!
    bio: String
  }

  input SigninInput {
    email: String!
    password: String!
  }
`;

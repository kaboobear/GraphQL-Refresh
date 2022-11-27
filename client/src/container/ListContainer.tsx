import React from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { Post } from "../types/post.interface";
import { ItemsList } from "../components/ItemsList/ItemsList";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export const ListContainer = () => {
  const { data, error, loading } = useQuery<{ posts: Post[] }>(GET_POSTS);

  if (loading) {
    return <CircularProgress />;
  }

  if (!data?.posts) {
    return <Alert>List is empty</Alert>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        List
      </Typography>
      <ItemsList items={data.posts} />
      {}
    </>
  );
};

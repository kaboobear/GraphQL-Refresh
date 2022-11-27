import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const POST_CREATE = gql`
  mutation PostCreate($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        id
        title
        user {
          name
        }
      }
    }
  }
`;

export const CreateItemContainer = () => {
  const [postCreate, { data, error, loading }] = useMutation(POST_CREATE);

  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    postCreate({
      variables: {
        title: item.title,
        content: item.description,
      },
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!data?.postCreate?.userErrors?.length && data?.postCreate.post) {
      console.log("post added", data.postCreate.post);
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Crate Item
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          id="description"
          onChange={onChange}
          autoComplete="current-description"
          sx={{ mb: 2 }}
        />
        <Button type="submit" fullWidth size="large" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};

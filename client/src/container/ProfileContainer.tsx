import React from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { Profile } from "../types/profile.interface";
import { useParams } from "react-router-dom";
import { ItemsList } from "../components/ItemsList/ItemsList";
import { Link } from "react-router-dom";

const GET_PROFILE = gql`
  query ($userId: ID) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        posts {
          id
          title
          content
        }
      }
    }
  }
`;

export const ProfileContainer = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery<{ profile: Profile }>(GET_PROFILE, {
    variables: { userId: id },
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (!data?.profile) {
    return <Typography>Profile not found</Typography>;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Profile
        </Typography>
        {data.profile.isMyProfile && (
          <Link to="/create">
            <Button variant="contained">Add Post</Button>
          </Link>
        )}
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {data?.profile.bio}
      </Typography>
      {data.profile.user.posts && <ItemsList items={data.profile.user.posts} />}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      userErrors {
        message
      }
      token
    }
  }
`;

export const SigninContainer = () => {
  const [signin, { data, error, loading }] = useMutation(SIGNIN);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signin({
      variables: { email: userData.email, password: userData.password },
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!data?.signin?.userErrors?.length && data?.signin.token) {
      localStorage.setItem("token", data?.signin.token);
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
        SignIn
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          id="password"
          onChange={onChange}
          autoComplete="cpassword"
          sx={{ mb: 2 }}
        />
        <Button type="submit" fullWidth size="large" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};

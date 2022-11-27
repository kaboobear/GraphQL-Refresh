import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string | undefined) => {
  if (!token) return null;

  try {
    return jwt.verify(token, "mytestsecret") as { userId: number };
  } catch {
    return null;
  }
};

import { Context } from "../types/context.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignupParams {
  input: {
    email: string;
    name: string;
    password: string;
    bio?: string;
  };
}

interface SigninParams {
  input: {
    email: string;
    password: string;
  };
}

interface AuthPayloadType {
  userErrors: { message: string }[];
  token: String | null;
}

export const authResolvers = {
  signup: async (
    parent: any,
    { input }: SignupParams,
    { prisma }: Context
  ): Promise<AuthPayloadType> => {
    const { email, name, password, bio } = input;

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [{ message: "Not valid email" }],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword) {
      return {
        userErrors: [{ message: "Not valid passvord" }],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    if (bio) {
      await prisma.profile.create({
        data: {
          bio,
          userId: user.id,
        },
      });
    }

    const token = await jwt.sign(
      {
        userId: user.id,
      },
      "mytestsecret",
      {
        expiresIn: 360000,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
  signin: async (
    parent: any,
    { input }: SigninParams,
    { prisma }: Context
  ): Promise<AuthPayloadType> => {
    const { email, password } = input;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return {
        userErrors: [{ message: "User not found" }],
        token: null,
      };
    }

    const isPasswordMatch = bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return {
        userErrors: [{ message: "Wrong password" }],
        token: null,
      };
    }

    const token = await jwt.sign(
      {
        userId: existingUser.id,
      },
      "mytestsecret",
      {
        expiresIn: 360000,
      }
    );

    return {
      token,
      userErrors: [],
    };
  },
};

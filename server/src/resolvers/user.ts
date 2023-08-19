import validatePassword from "../utils/validatePassword";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { __prod__ } from "../constants";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
class UsernamePasswordRegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  privateAccount: boolean;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordRegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username must be greater than 2 characters.",
          },
        ],
      };
    }

    if (__prod__) {
      const passwordErrors = validatePassword(options.password);
      if (passwordErrors) return passwordErrors;
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      const result = em.create(User, {
        username: options.username,
        password: hashedPassword,
        privateAccount: options.privateAccount,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await em.persistAndFlush(result);

      user = result;
      req.session.userId = user.id;
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username is already taken!",
            },
          ],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username.toLowerCase(),
    });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "User not found. Sign up to get started.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid password. Please try again.",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async changePrivacy(
    @Arg("isPrivate") isPrivate: boolean,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "user",
            message: "User not authenticated.",
          },
        ],
      };
    }

    const user = await em.findOne(User, { id: req.session.userId });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User not found.",
          },
        ],
      };
    }

    user.privateAccount = isPrivate;
    await em.persistAndFlush(user);

    return { user };
  }
}

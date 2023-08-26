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
import LevenshteinDistance from "../utils/LevenshteinDistance";
import { isValidEmail } from "../utils/isValidEmail";
import { isValidPassword } from "../utils/isValidPassword";
import { isValidUsername } from "../utils/isValidUsername";

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
  email: string;
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

@ObjectType()
class ProfileResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean, { nullable: true })
  owner?: boolean;
}

@ObjectType()
class UsersResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [User], { nullable: true })
  users?: User[];
}

@Resolver()
export class UserResolver {
  @Query(() => UsersResponse)
  async searchUsers(
    @Arg("search") search: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UsersResponse> {
    const limit = 5;

    if (search == null || search === "") {
      return {
        errors: [
          {
            field: "query",
            message: "A search string is required",
          },
        ],
      };
    }

    const currentUser = req.session.userId;

    const users = await em
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.username ILIKE :search", { search: `%${search}%` })
      .take(limit)
      .getMany();

    // .andWhere("user.id != :currentUser", { currentUser })

    if (users.length < limit) {
      const remainder = limit - users.length;
      const allUsers = await em.getRepository(User).find();

      const fuzzyUsers = allUsers
        .filter(
          (user) =>
            user.id !== currentUser && !users.some((u) => u.id === user.id)
        )
        .filter((user) => LevenshteinDistance(user.username, search) <= 15)
        .sort((userA, userB) => {
          const distanceA = LevenshteinDistance(userA.username, search);
          const distanceB = LevenshteinDistance(userB.username, search);
          return distanceA - distanceB;
        })
        .slice(0, remainder);

      return { users: [...users, ...fuzzyUsers] };
    }

    return { users };
  }

  @Query(() => ProfileResponse, { nullable: true })
  async profile(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<ProfileResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "auth",
            message: "User not authenticated.",
          },
        ],
      };
    }

    const user = await User.findOne({ where: { username } });

    const currentUserId = req.session.userId;

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

    const owner = user.id === currentUserId;

    return { user, owner };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne({ where: { id: req.session.userId } });
  }

  // Todo: Add first & last name fields
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordRegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const userExists = await User.findOne({ where: { email: options.email } });
    if (userExists) {
      return {
        errors: [
          {
            field: "email",
            message: "Email is already in use!",
          },
        ],
      };
    }

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

    if (!isValidUsername(options.username).result) {
      const errors = isValidUsername(options.username).errors;
      return { errors };
    }

    if (!isValidEmail(options.email)) {
      return {
        errors: [
          {
            field: "email",
            message: "Not a valid email.",
          },
        ],
      };
    }

    if (__prod__) {
      const passwordErrors = isValidPassword(options.password);
      if (passwordErrors) return passwordErrors;
    }

    const hashedPassword = await argon2.hash(options.password, {
      saltLength: 12,
    });

    let user;
    try {
      const result = await em
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          privateAccount: options.privateAccount,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
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
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });
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

  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() { em, req, res }: MyContext): Promise<boolean> {
    try {
      if (!req.session.userId) {
        return false;
      }

      const result = await em
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: req.session.userId })
        .execute();

      if (result.affected === 0) {
        return false;
      }

      const userExists = await User.findOne({
        where: { id: req.session.userId },
      });

      if (userExists) {
        return false;
      }

      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            res.clearCookie("qid");
            resolve(true);
          }
        });
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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

    let userExists = await User.findOne({ where: { id: req.session.userId } });

    if (!userExists) {
      return {
        errors: [
          {
            field: "user",
            message: "User not found.",
          },
        ],
      };
    }

    const result = await em
      .createQueryBuilder()
      .update(User)
      .where({
        id: req.session.userId,
      })
      .set({
        privateAccount: isPrivate,
      })
      .returning("*")
      .execute();

    const user = result.raw[0];

    return { user };
  }

  @Mutation(() => UserResponse)
  async changeHideConnections(
    @Arg("hideConnections") hideConnections: boolean,
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

    let userExists = await User.findOne({ where: { id: req.session.userId } });

    if (!userExists) {
      return {
        errors: [
          {
            field: "user",
            message: "User not found.",
          },
        ],
      };
    }

    const result = await em
      .createQueryBuilder()
      .update(User)
      .where({
        id: req.session.userId,
      })
      .set({
        hideConnections,
      })
      .returning("*")
      .execute();

    const user = result.raw[0];
    return { user };
  }
}

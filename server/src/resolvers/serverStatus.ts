import { Query, Resolver } from "type-graphql";

@Resolver()
export class ServerConnectionResolver {
  @Query(() => String)
  serverConnection() {
    return "Ready!";
  }
}

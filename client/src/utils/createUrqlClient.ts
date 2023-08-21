/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangePrivacyMutation,
  DeleteAccountMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";
import { fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          changePrivacy: (_result, _args, cache, _info) => {
            betterUpdateQuery<ChangePrivacyMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.changePrivacy.errors) {
                  return query;
                } else {
                  return {
                    me: result.changePrivacy.user,
                  };
                }
              }
            );
          },
          deleteAccount: (_result, _args, cache, _info) => {
            betterUpdateQuery<DeleteAccountMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (!result.deleteAccount) {
                  return query;
                } else {
                  return {
                    me: null,
                  };
                }
              }
            );
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              () => ({ me: null })
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
  fetch: async (url: RequestInfo | URL, options: RequestInit | undefined) => {
    const timeoutPromise = new Promise<Response>(
      (_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 10000) // 10 seconds timeout
    );

    const response = await Promise.race([fetch(url, options), timeoutPromise]);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  },

  fetchOptions: {
    credentials: "include" as const,
  },
  url: "http://localhost:4000/graphql",
});

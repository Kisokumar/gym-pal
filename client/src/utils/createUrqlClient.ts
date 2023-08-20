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
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
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
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeHideConnections: UserResponse;
  changePrivacy: UserResponse;
  createWorkoutSession: WorkoutSession;
  deleteAccount: Scalars['Boolean']['output'];
  deleteWorkoutSession: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateWorkoutSession?: Maybe<WorkoutSession>;
};


export type MutationChangeHideConnectionsArgs = {
  hideConnections: Scalars['Boolean']['input'];
};


export type MutationChangePrivacyArgs = {
  isPrivate: Scalars['Boolean']['input'];
};


export type MutationCreateWorkoutSessionArgs = {
  sessionType: Scalars['String']['input'];
};


export type MutationDeleteWorkoutSessionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordRegisterInput;
};


export type MutationUpdateWorkoutSessionArgs = {
  id: Scalars['Float']['input'];
  sessionType: Scalars['String']['input'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  errors?: Maybe<Array<FieldError>>;
  owner?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  WorkoutSession?: Maybe<WorkoutSession>;
  WorkoutSessions: Array<WorkoutSession>;
  me?: Maybe<User>;
  profile?: Maybe<ProfileResponse>;
  searchUsers: UsersResponse;
  serverConnection: Scalars['String']['output'];
};


export type QueryWorkoutSessionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProfileArgs = {
  username: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  search: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  hideConnections: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  privateAccount: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsernamePasswordRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  privateAccount: Scalars['Boolean']['input'];
  username: Scalars['String']['input'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type WorkoutSession = {
  __typename?: 'WorkoutSession';
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  sessionEndTime: Scalars['String']['output'];
  sessionStartTime: Scalars['String']['output'];
  sessionType: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type RegularUserFragment = { __typename?: 'User', username: string, privateAccount: boolean, createdAt: string };

export type ChangePrivacyMutationVariables = Exact<{
  isPrivate: Scalars['Boolean']['input'];
}>;


export type ChangePrivacyMutation = { __typename?: 'Mutation', changePrivacy: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', email: string, username: string, privateAccount: boolean, createdAt: string } | null } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', email: string, username: string, privateAccount: boolean, createdAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', email: string, username: string, privateAccount: boolean, createdAt: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, username: string, privateAccount: boolean, createdAt: string } | null };

export type ProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'ProfileResponse', owner?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string, privateAccount: boolean, hideConnections: boolean, createdAt: string, updatedAt: string } | null } | null };

export type UserSearchQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type UserSearchQuery = { __typename?: 'Query', searchUsers: { __typename?: 'UsersResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, users?: Array<{ __typename?: 'User', username: string, privateAccount: boolean, createdAt: string }> | null } };

export type ServerConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerConnectionQuery = { __typename?: 'Query', serverConnection: string };

export type WorkoutSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutSessionsQuery = { __typename?: 'Query', WorkoutSessions: Array<{ __typename?: 'WorkoutSession', id: number, createdAt: string, updatedAt: string, sessionType: string }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  username
  privateAccount
  createdAt
}
    `;
export const ChangePrivacyDocument = gql`
    mutation ChangePrivacy($isPrivate: Boolean!) {
  changePrivacy(isPrivate: $isPrivate) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      email
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangePrivacyMutation() {
  return Urql.useMutation<ChangePrivacyMutation, ChangePrivacyMutationVariables>(ChangePrivacyDocument);
};
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
  deleteAccount
}
    `;

export function useDeleteAccountMutation() {
  return Urql.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      email
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordRegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      email
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    email
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const ProfileDocument = gql`
    query Profile($username: String!) {
  profile(username: $username) {
    owner
    errors {
      field
      message
    }
    user {
      username
      privateAccount
      hideConnections
      createdAt
      updatedAt
    }
  }
}
    `;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<ProfileQuery, ProfileQueryVariables>({ query: ProfileDocument, ...options });
};
export const UserSearchDocument = gql`
    query UserSearch($search: String!) {
  searchUsers(search: $search) {
    errors {
      field
      message
    }
    users {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserSearchQuery(options: Omit<Urql.UseQueryArgs<UserSearchQueryVariables>, 'query'>) {
  return Urql.useQuery<UserSearchQuery, UserSearchQueryVariables>({ query: UserSearchDocument, ...options });
};
export const ServerConnectionDocument = gql`
    query ServerConnection {
  serverConnection
}
    `;

export function useServerConnectionQuery(options?: Omit<Urql.UseQueryArgs<ServerConnectionQueryVariables>, 'query'>) {
  return Urql.useQuery<ServerConnectionQuery, ServerConnectionQueryVariables>({ query: ServerConnectionDocument, ...options });
};
export const WorkoutSessionsDocument = gql`
    query WorkoutSessions {
  WorkoutSessions {
    id
    createdAt
    updatedAt
    sessionType
  }
}
    `;

export function useWorkoutSessionsQuery(options?: Omit<Urql.UseQueryArgs<WorkoutSessionsQueryVariables>, 'query'>) {
  return Urql.useQuery<WorkoutSessionsQuery, WorkoutSessionsQueryVariables>({ query: WorkoutSessionsDocument, ...options });
};
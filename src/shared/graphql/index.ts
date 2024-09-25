import { GraphQLClient, RequestOptions } from "graphql-request";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Base64: { input: any; output: any };
  BigInt: { input: any; output: any };
};

export type CreateZkCertificateIn = {
  encryptionPubKey: Scalars["Base64"]["input"];
  holderCommitment: Scalars["BigInt"]["input"];
};

export type CreateZkCertificateOut = {
  __typename?: "CreateZKCertificateOut";
  certificate: Maybe<Scalars["String"]["output"]>;
  progress: Scalars["Float"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTwitterZKCertificate: CreateZkCertificateOut;
  createUniswapZKCertificate: CreateZkCertificateOut;
};

export type MutationCreateTwitterZkCertificateArgs = {
  in: CreateZkCertificateIn;
};

export type MutationCreateUniswapZkCertificateArgs = {
  in: CreateZkCertificateIn;
};

export type Query = {
  __typename?: "Query";
  user: Maybe<User>;
};

export type User = {
  __typename?: "User";
  address: Scalars["String"]["output"];
  avatarUrl: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type CreateTwitterZkCertificateMutationVariables = Exact<{
  in: CreateZkCertificateIn;
}>;

export type CreateTwitterZkCertificateMutation = {
  __typename?: "Mutation";
  createTwitterZKCertificate: {
    __typename?: "CreateZKCertificateOut";
    certificate: string | null;
    progress: number;
  };
};

export type CreateUniswapZkCertificateMutationVariables = Exact<{
  in: CreateZkCertificateIn;
}>;

export type CreateUniswapZkCertificateMutation = {
  __typename?: "Mutation";
  createUniswapZKCertificate: {
    __typename?: "CreateZKCertificateOut";
    certificate: string | null;
    progress: number;
  };
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    username: string;
    avatarUrl: string;
    address: string;
  } | null;
};

export const CreateTwitterZkCertificateDocument = gql`
  mutation CreateTwitterZKCertificate($in: CreateZKCertificateIn!) {
    createTwitterZKCertificate(in: $in) {
      certificate
      progress
    }
  }
`;
export const CreateUniswapZkCertificateDocument = gql`
  mutation CreateUniswapZKCertificate($in: CreateZKCertificateIn!) {
    createUniswapZKCertificate(in: $in) {
      certificate
      progress
    }
  }
`;
export const GetUserDocument = gql`
  query GetUser {
    user {
      username
      avatarUrl
      address
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CreateTwitterZKCertificate(
      variables: CreateTwitterZkCertificateMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateTwitterZkCertificateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateTwitterZkCertificateMutation>(
            CreateTwitterZkCertificateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateTwitterZKCertificate",
        "mutation",
        variables
      );
    },
    CreateUniswapZKCertificate(
      variables: CreateUniswapZkCertificateMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateUniswapZkCertificateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUniswapZkCertificateMutation>(
            CreateUniswapZkCertificateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateUniswapZKCertificate",
        "mutation",
        variables
      );
    },
    GetUser(
      variables?: GetUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetUser",
        "query",
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;

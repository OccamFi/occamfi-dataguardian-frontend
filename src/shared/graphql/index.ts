import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("/api/query" as string, {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Base64: { input: any; output: any; }
  BigInt: { input: any; output: any; }
};

export type CreateTwitterZkCertificateIn = {
  encryptionPubKey: Scalars['Base64']['input'];
  holderCommitment: Scalars['BigInt']['input'];
};

export type CreateTwitterZkCertificateOut = {
  __typename?: 'CreateTwitterZKCertificateOut';
  certificate: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTwitterZKCertificate: CreateTwitterZkCertificateOut;
};


export type MutationCreateTwitterZkCertificateArgs = {
  in: CreateTwitterZkCertificateIn;
};

export type Query = {
  __typename?: 'Query';
  user: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateTwitterZkCertificateMutationVariables = Exact<{
  in: CreateTwitterZkCertificateIn;
}>;


export type CreateTwitterZkCertificateMutation = { __typename?: 'Mutation', createTwitterZKCertificate: { __typename?: 'CreateTwitterZKCertificateOut', certificate: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', username: string, avatarUrl: string } | null };



export const CreateTwitterZkCertificateDocument = `
    mutation CreateTwitterZKCertificate($in: CreateTwitterZKCertificateIn!) {
  createTwitterZKCertificate(in: $in) {
    certificate
  }
}
    `;

export const useCreateTwitterZkCertificateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTwitterZkCertificateMutation, TError, CreateTwitterZkCertificateMutationVariables, TContext>) => {
    
    return useMutation<CreateTwitterZkCertificateMutation, TError, CreateTwitterZkCertificateMutationVariables, TContext>(
      {
    mutationKey: ['CreateTwitterZKCertificate'],
    mutationFn: (variables?: CreateTwitterZkCertificateMutationVariables) => fetcher<CreateTwitterZkCertificateMutation, CreateTwitterZkCertificateMutationVariables>(CreateTwitterZkCertificateDocument, variables)(),
    ...options
  }
    )};

export const GetUserDocument = `
    query GetUser {
  user {
    username
    avatarUrl
  }
}
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      variables?: GetUserQueryVariables,
      options?: Omit<UseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUser'] : ['GetUser', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
    ...options
  }
    )};

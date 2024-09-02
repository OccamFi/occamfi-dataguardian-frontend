import { GraphQLClient } from "graphql-request";
import { getSdk } from './index';

const endpoint = `${import.meta.env.VITE_ENDPOINT}` ?? "";

const client = new GraphQLClient(endpoint, {
	credentials: "include",
	mode: "cors",
});

export const graphqlSdk = getSdk(client);

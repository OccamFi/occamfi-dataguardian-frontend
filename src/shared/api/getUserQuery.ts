import { useQuery } from "@tanstack/react-query";

import { graphqlSdk } from "shared/graphql/client";

export const useGetUserQuery = () => {
  const fetchUser = async () => {
    const response = await graphqlSdk.GetUser();
    return response.user;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};

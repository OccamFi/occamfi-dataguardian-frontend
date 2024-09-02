import { createEffect, createStore, sample } from "effector";

import { graphqlSdk } from "shared/graphql/client";

const createModel = () => {
  const $user = createStore<boolean>(false);

  const getUserFx = createEffect(async () => {
    return await graphqlSdk.GetUser();
  });

  sample({
    source: getUserFx.doneData,
    fn: (data) => Boolean(data.user),
    target: $user,
  });

  getUserFx();

  return {
    $user,
    getUserFx,
  };
};

export const { ...$$twitterModel } = createModel();

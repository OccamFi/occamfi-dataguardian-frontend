import { createEffect, createStore, sample } from "effector";

const createModel = () => {
  const url = import.meta.env.VITE_API_HOST;

  const $user = createStore<boolean>(false);

  return {
    $user,
  };
};

export const { ...$$twitterModel } = createModel();

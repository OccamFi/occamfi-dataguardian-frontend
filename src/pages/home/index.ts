import { lazy } from "react";

export const HomePage = lazy(() =>
  import("./home").then((module) => ({ default: module.Home }))
);

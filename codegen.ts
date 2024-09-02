import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // https://stage-api-guardian.occam.fi/query
  // https://occam-dataguardian.lookhere.tech/query
  schema: "https://stage-api-guardian.occam.fi/query",
  documents: "src/shared/graphql/**/*.graphql",
  generates: {
    "src/shared/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        exposeQueryKeys: true,
        addSuspenseQuery: true,
        reactQueryVersion: 5,
        avoidOptionals: true,
        constEnums: true,
        enumsAsTypes: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: "prettier --write",
  },
};

export default config;

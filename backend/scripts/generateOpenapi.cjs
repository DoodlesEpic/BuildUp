const fs = require("node:fs");
const path = require("node:path");
const postmanToOpenApi = require("postman-to-openapi");

const docsDir = path.resolve(__dirname, "../docs/api");
const postmanCollectionPath = path.join(
  docsDir,
  "buildup.postman_collection.json"
);
const openapiPath = path.join(docsDir, "openapi.json");

const methodNames = new Set([
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
]);

const normalizeNoAuthSecurity = (openapi) => {
  for (const pathItem of Object.values(openapi.paths ?? {})) {
    for (const [methodName, operation] of Object.entries(pathItem)) {
      if (!methodNames.has(methodName)) continue;
      if (!Array.isArray(operation.security)) continue;

      const onlyNoAuth =
        operation.security.length === 1 &&
        Object.prototype.hasOwnProperty.call(operation.security[0], "noauthAuth");

      if (onlyNoAuth) operation.security = [];
    }
  }

  delete openapi.components?.securitySchemes?.noauthAuth;

  if (
    openapi.components?.securitySchemes &&
    Object.keys(openapi.components.securitySchemes).length === 0
  ) {
    delete openapi.components.securitySchemes;
  }

  if (openapi.components && Object.keys(openapi.components).length === 0) {
    delete openapi.components;
  }
};

const generateOpenapi = async () => {
  const openapiJson = await postmanToOpenApi(postmanCollectionPath, null, {
    outputFormat: "json",
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
  });

  const openapi = JSON.parse(openapiJson);
  normalizeNoAuthSecurity(openapi);

  fs.writeFileSync(openapiPath, `${JSON.stringify(openapi, null, 2)}\n`);
  console.log(`Generated ${path.relative(process.cwd(), openapiPath)}`);
};

generateOpenapi().catch((error) => {
  console.error(error);
  process.exit(1);
});

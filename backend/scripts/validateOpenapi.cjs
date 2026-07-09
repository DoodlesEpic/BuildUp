const path = require("node:path");
const SwaggerParser = require("@apidevtools/swagger-parser");

const openapiPath = path.resolve(__dirname, "../docs/api/openapi.json");

const expectedPaths = [
  "/api/docs",
  "/api/docs/openapi.json",
  "/api/users",
  "/api/users/login",
  "/api/users/me",
  "/api/notes",
  "/api/notes/{noteId}",
  "/api/habits",
  "/api/habits/{habitId}",
  "/api/habits/{habitId}/habitDay",
  "/api/habits/{habitId}/habitDay/{habitDayId}",
];

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

const addError = (errors, condition, message) => {
  if (!condition) errors.push(message);
};

const getContentSchemas = (content = {}) =>
  Object.values(content)
    .map((mediaType) => mediaType.schema)
    .filter(Boolean);

const schemaHasShape = (schema) => {
  if (!schema || typeof schema !== "object") return false;
  if (schema.$ref || schema.allOf || schema.oneOf || schema.anyOf) return true;
  if (schema.type === "array") return schemaHasShape(schema.items);
  if (schema.type !== "object") return true;

  return Boolean(schema.properties || schema.additionalProperties);
};

const validateExpectedPaths = (api, errors) => {
  for (const expectedPath of expectedPaths) {
    addError(
      errors,
      Object.prototype.hasOwnProperty.call(api.paths ?? {}, expectedPath),
      `Missing documented path: ${expectedPath}`
    );
  }
};

const validateCanonicalDescription = (api, errors) => {
  const description = api.info?.description ?? "";
  addError(
    errors,
    !/postman.*source of truth|generated from.*postman/i.test(description),
    "OpenAPI description must not describe Postman as the source of truth"
  );
};

const validateSecurity = (api, errors) => {
  addError(
    errors,
    api.components?.securitySchemes?.bearerAuth?.scheme === "bearer",
    "Missing bearerAuth security scheme"
  );
};

const validateOperationSchemas = (api, errors) => {
  for (const [routePath, pathItem] of Object.entries(api.paths ?? {})) {
    for (const [methodName, operation] of Object.entries(pathItem)) {
      if (!methodNames.has(methodName)) continue;

      const operationLabel = `${methodName.toUpperCase()} ${routePath}`;
      addError(
        errors,
        Boolean(operation.operationId),
        `${operationLabel} is missing operationId`
      );

      for (const schema of getContentSchemas(operation.requestBody?.content)) {
        addError(
          errors,
          schemaHasShape(schema),
          `${operationLabel} request body uses a vague schema`
        );
      }

      for (const [statusCode, response] of Object.entries(
        operation.responses ?? {}
      )) {
        for (const schema of getContentSchemas(response.content)) {
          addError(
            errors,
            schemaHasShape(schema),
            `${operationLabel} ${statusCode} response uses a vague schema`
          );
        }
      }
    }
  }
};

const validateOpenapi = async () => {
  const parsedApi = await SwaggerParser.validate(openapiPath);
  const api = require(openapiPath);
  const errors = [];

  validateExpectedPaths(api, errors);
  validateCanonicalDescription(api, errors);
  validateSecurity(api, errors);
  validateOperationSchemas(api, errors);

  if (errors.length > 0) {
    throw new Error(
      `OpenAPI contract validation failed:\n- ${errors.join("\n- ")}`
    );
  }

  console.log(`Valid OpenAPI ${parsedApi.openapi}: ${parsedApi.info.title}`);
};

validateOpenapi().catch((error) => {
  console.error(error);
  process.exit(1);
});

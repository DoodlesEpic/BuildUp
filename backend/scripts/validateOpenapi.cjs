const path = require("node:path");
const SwaggerParser = require("@apidevtools/swagger-parser");

const openapiPath = path.resolve(__dirname, "../docs/api/openapi.json");

SwaggerParser.validate(openapiPath)
  .then((api) => {
    console.log(`Valid OpenAPI ${api.openapi}: ${api.info.title}`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

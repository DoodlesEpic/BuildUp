import { Router } from "express";
import * as fs from "node:fs";
import * as path from "node:path";
import swaggerUi from "swagger-ui-express";

const openapiPath = path.resolve(__dirname, "../../docs/api/openapi.json");
const openapiDocument = JSON.parse(fs.readFileSync(openapiPath, "utf8"));

const apiDocsRouter = Router();

apiDocsRouter.get("/openapi.json", (_req, res) => {
  res.json(openapiDocument);
});

apiDocsRouter.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, {
    customSiteTitle: "BuildUp API Docs",
    explorer: true,
    swaggerOptions: {
      url: "/api/docs/openapi.json",
    },
  })
);

export default apiDocsRouter;

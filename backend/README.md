# BuildUp Backend

A website to track notes, habits and become a better person.

## API documentation

The canonical API contract lives at [docs/api/openapi.json](./docs/api/openapi.json). Keep this OpenAPI schema updated when backend routes, request bodies, response shapes, or authentication behavior changes.

When the backend is running, the same schema is available in two local forms:

| URL | Description |
| --- | --- |
| `http://localhost:5000/api/docs` | Interactive Swagger UI |
| `http://localhost:5000/api/docs/openapi.json` | Raw OpenAPI schema |

Validate the contract before committing API documentation changes:

```sh
yarn workspace @buildup/backend docs:validate
```

## Postman collection

The Postman collection at [docs/api/buildup.postman_collection.json](./docs/api/buildup.postman_collection.json) is kept as a manual testing and import companion. It is not the source of truth for API documentation; import or refresh it from the OpenAPI schema when the testing workflow needs to change.

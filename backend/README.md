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

Existing external Postman shortcuts are still available:

### Notes collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19580260-b75daca7-ec99-4736-b844-d627109d7e44?action=collection%2Ffork&collection-url=entityId%3D19580260-b75daca7-ec99-4736-b844-d627109d7e44%26entityType%3Dcollection%26workspaceId%3Da8af3e37-c139-42ce-9e10-103598df5421)

### Users collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19580260-67ab9241-598d-4002-92ea-491a62ae2d39?action=collection%2Ffork&collection-url=entityId%3D19580260-67ab9241-598d-4002-92ea-491a62ae2d39%26entityType%3Dcollection%26workspaceId%3Da8af3e37-c139-42ce-9e10-103598df5421)

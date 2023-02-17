# BuildUp

A website to track notes, habits and become a better person.

## Monorepo

This is a monorepo of the frontend and backend for the BuildUp web app. It uses yarn for package management with the node-modules strategy and without zero installs.

Both of the codebases use Typescript, ESLint, and Prettier. Most commands should be run through the top level package, but installation must be done manually for each package.

### Backend

This is the application backend built in Express which connects to a MongoDB instance, more information is available on its own [README](./backend/README.md).

### Frontend

This is a frontend built in React with Redux Toolkit for state management and querying the backend API, more information is available on its own [README](./frontend/README.md).

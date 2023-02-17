# BuildUp

A website to track notes, habits and become a better person.

## Monorepo

This is a monorepo of the frontend and backend for the BuildUp web app. It uses yarn for package management with the node-modules strategy and without zero installs. .yarn is commited so there is no need to manually install yarn v3 or the used plugins, they are already part of the project.

Both of the codebases use Typescript, ESLint, and Prettier. Most commands should be run through the top level package, a few commands must be run using yarn workspace foreach. For more information on how to work with yarn workspaces, see https://yarnpkg.com/features/workspaces

### Commands

| Command                              | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| `yarn`                               | To install all dependencies on the monorepo |
| `yarn dev`                           | To start developing on the monorepo         |
| `yarn build`                         | To build the monorepo                       |
| `yarn start`                         | To run the project in production            |
| `yarn workspaces focus --production` | To install dependencies in production       |
| `yarn workspaces foreach`            | To run a command in each package            |
| `yarn workspaces foreach run lint`   | To run the lint command in each package     |
| `yarn workspaces foreach run format` | To run the format command in each package   |
| `yarn workspaces foreach run build`  | To run the build command in each package    |

### Backend

This is the application backend built in Express which connects to a MongoDB instance, more information is available on its own [README](./backend/README.md).

### Frontend

This is a frontend built in React with Redux Toolkit for state management and querying the backend API, more information is available on its own [README](./frontend/README.md).

## License

This project is licensed undere the AGPL v3. For more information read the [LICENSE](LICENSE).

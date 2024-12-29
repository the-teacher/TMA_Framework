# `FrameworkJS` Router

A simple yet powerful routing solution for `Express.js` applications that provides a clean and intuitive way to organize routes and controllers.

## Features

- Simple route definition syntax
- Controller-based actions
- Scoped routes for better organization
- Automatic controller loading

## Usage

### Basic Routes

```ts
// Define root route
root("index#index");

// Define GET and POST routes
get("/users", "users#show");
post("/users", "users#update");

// Define GET and POST routes
get("/posts", "posts#show");
post("/posts", "posts#update");
```

Files structure:

```bash
controllers/
    indexController.ts
    usersController.ts
    postsController.ts
```

### Scoped Routes

Group related routes under a common prefix:

```ts
// Define scoped routes
routeScope("admin", () => {
  // Define GET and POST routes
  get("/users", "users#show");
  post("/users", "users#update");

  // Define GET and POST routes
  get("/posts", "posts#show");
  post("/posts", "posts#update");
});
```

This will create routes:

- GET /admin/users -> controllers/admin/usersController.ts#show
- POST /admin/users -> controllers/admin/usersController.ts#update
- GET /admin/posts -> controllers/admin/postsController.ts#show
- POST /admin/posts -> controllers/admin/postsController.ts#update

### Controllers Structure

Controllers should be placed in the `controllers` directory. For scoped routes, controllers are automatically looked up in the corresponding subdirectory.

```bash
controllers/
    indexController.ts
    usersController.ts
    postsController.ts
    admin/
        usersController.ts
        postsController.ts
```

Example controller:

```typescript
// controllers/usersController.ts
import { Request, Response } from "express";

export const show = (req: Request, res: Response) => {
  res.send("Users list");
};

export const update = (req: Request, res: Response) => {
  res.send("User updated");
};
```

## API Reference

- `root(controllerAction)`: Define root route (/)
- `get(path, controllerAction)`: Define GET route
- `post(path, controllerAction)`: Define POST route
- `routeScope(prefix, callback)`: Group routes under a common prefix

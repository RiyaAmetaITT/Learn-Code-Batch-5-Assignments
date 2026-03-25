# TypeScript Code Review & Coding Guide

## 1. Purpose

This guide helps reviewers and contributors understand the coding
standards, structure, and best practices for reviewing TypeScript code
in the project. The goal is to ensure code is readable, maintainable,
consistent, and type-safe.

------------------------------------------------------------------------

## 2. Project Structure

Typical project structure:

    src/
     ├── controllers
     ├── services
     ├── repositories
     ├── models
     └── utils

**controllers** -- Handles request and response logic\
**services** -- Contains business logic\
**repositories** -- Handles database interactions\
**models** -- TypeScript interfaces and types\
**utils** -- Helper or reusable functions

------------------------------------------------------------------------

## 3. Type Safety

TypeScript's main benefit is static typing.

Guidelines:

-   Avoid using `any`
-   Define interfaces or type aliases for structured data
-   Specify function return types

Example:

``` ts
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User {
  return { id, name: "Example" };
}
```

------------------------------------------------------------------------

## 4. Naming Conventions

Follow consistent naming standards:

  Element      Convention   Example
  ------------ ------------ -----------------
  Variables    camelCase    userList
  Functions    camelCase    getUserById()
  Classes      PascalCase   UserService
  Interfaces   PascalCase   User
  Constants    UPPER_CASE   MAX_RETRY_COUNT

------------------------------------------------------------------------

## 5. Function Design

Functions should:

-   Perform a single responsibility
-   Be small and reusable
-   Have clear names
-   Define parameter and return types

Example:

``` ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

------------------------------------------------------------------------

## 6. Interfaces and Types

All structured objects should have defined types.

Example:

``` ts
interface Product {
  id: number;
  price: number;
}
```

------------------------------------------------------------------------

## 7. Error Handling

Ensure proper error handling for async operations.

``` ts
async function fetchUser(id: number) {
  try {
    const user = await api.getUser(id);
    return user;
  } catch (error) {
    console.error("Error fetching user", error);
  }
}
```

------------------------------------------------------------------------

## 8. Code Readability

Code should be simple and easy to understand.

Avoid deep nesting.

Example improvement using optional chaining:

``` ts
console.log(user?.address?.city);
```

------------------------------------------------------------------------

## 9. Async Best Practices

Prefer `async/await` over chained promises.

Preferred:

``` ts
const user = await api.getUser();
```

Avoid excessive `.then()` chains unless necessary.

------------------------------------------------------------------------

## 10. Avoid Code Duplication

Repeated logic should be extracted into reusable functions.

``` ts
function calculateTotal(price:number, quantity:number){
  return price * quantity;
}
```

------------------------------------------------------------------------

## 11. Linting and Formatting

Use automated tools to maintain consistent formatting.

Recommended tools:

-   ESLint
-   Prettier

These tools ensure consistent style across the project.

------------------------------------------------------------------------

## 12. Comments and Documentation

Comments should explain **WHY**, not **WHAT**.

Example:

``` ts
// Retry counter increases after each failed attempt
retryCount++;
```

------------------------------------------------------------------------

## 13. Security and Validation

Always validate inputs and never trust external data.

``` ts
if (!email) {
  throw new Error("Email is required");
}
```

------------------------------------------------------------------------

## 14. Code Review Checklist

When reviewing TypeScript code, check the following:

-   Are proper types used?
-   Is `any` avoided?
-   Are functions small and focused?
-   Are naming conventions followed?
-   Is error handling implemented?
-   Is the code readable and maintainable?
-   Is duplication avoided?
-   Does the code follow the project structure?
-   Are linting and formatting rules followed?

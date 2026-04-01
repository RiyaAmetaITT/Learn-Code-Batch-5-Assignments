# Use Cases of try-finally

## Exploration Summary
What I discovered about using `try-finally` (without a `catch` block) is that it is incredibly useful when we *don't* want to handle the error at the immediate level, but we still need to guarantee that some cleanup code runs before the error propagates upwards. 

By omitting `catch`, the function fulfills its cleanup responsibilities while explicitly passing the actual error handling off to the caller higher up in the hierarchy.

### Key Applications
*   **Resource Management:** Used to ensure files, database connections, or streams are always closed or returned to a pool, even if an error occurs.
*   **Lock Handling:** Ensures mutual-exclusion locks are always released in concurrent systems to avoid permanent deadlocks, even if a critical section fails.
*   **Backend/API Handling:** In backend code, used to clean up local resources while letting global/top-level route error handlers effectively govern the API responses.
*   **UI State Reset:** In frontend applications, ensures UI states (like disabling "loading" spinners) are reliably reset to normal even if a backend fetch request fails.
*   **Error Propagation by Design:** Utilized when a specific function's job is not error-resolution, but it must perform cleanup prior to passing the buck up the chain.

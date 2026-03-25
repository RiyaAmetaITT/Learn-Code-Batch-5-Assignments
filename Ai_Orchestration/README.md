## TypeScript backend folder structure

This assignment uses a conventional backend layout plus domain folders for the orchestration engine.

### Structure

- `src/`
  - `index.ts` (public exports)
  - `app/` (app wiring)
  - `controllers/` (HTTP layer)
  - `services/` (business use-cases)
  - `repositories/` (data access)
  - `models/` (types/entities)
  - `utils/` (shared helpers)
  - `observability/` (logging/tracing)
  - `orchestration/`
    - `engine/` (workflow runtime)
    - `steps/` (pluggable step executors)
    - `workflows/` (workflow definitions/builders)


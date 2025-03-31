# env2json-converter

A TypeScript library that converts `.env` files to JSON objects with type safety support.

## Features

- Convert `.env` files to JSON objects
- Type-safe environment variable handling
- Schema validation for required environment variables
- Error handling for missing or invalid files
- Zero dependencies (except for development)

## Installation

```bash
npm install env2json-converter
```

## Usage

### Basic Usage

```typescript
import { envToJson } from "env2json-converter";

// Convert .env file to JSON object
const envObject = envToJson(".env");

// Example output:
// {
//   DB_HOST: "localhost",
//   DB_PORT: "5432",
//   API_KEY: "secret123"
// }
```

### Type-Safe Usage

```typescript
import { envToJsonTyped } from "env2json-converter";

// Define your environment variable types
interface DatabaseConfig {
  DB_HOST: string;
  DB_PORT: string;
  API_KEY: string;
}

// Define schema for validation
const schema: Record<keyof DatabaseConfig, string> = {
  DB_HOST: "string",
  DB_PORT: "string",
  API_KEY: "string",
};

// Convert with type safety
const config = envToJsonTyped<DatabaseConfig>(".env", schema);

// Now config is fully typed!
console.log(config.DB_HOST); // TypeScript knows this exists
```

## API

### `envToJson(envPath: string): EnvConfig`

Converts a `.env` file to a JSON object.

**Parameters:**

- `envPath`: Path to the `.env` file

**Returns:**

- An object containing all environment variables

**Throws:**

- Error if the `.env` file doesn't exist
- Error if the `.env` file is invalid

### `envToJsonTyped<T extends EnvConfig>(envPath: string, schema?: Record<keyof T, string>): T`

Converts a `.env` file to a typed JSON object with optional schema validation.

**Parameters:**

- `envPath`: Path to the `.env` file
- `schema`: Optional schema to validate environment variables

**Returns:**

- A typed object containing all environment variables

**Throws:**

- Error if the `.env` file doesn't exist
- Error if the `.env` file is invalid
- Error if required variables are missing (when schema is provided)

## Example `.env` File

```env
DB_HOST=localhost
DB_PORT=5432
API_KEY=secret123
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linter
npm run lint
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

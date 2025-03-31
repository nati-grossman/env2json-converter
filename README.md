# env2json-converter

[![npm version](https://img.shields.io/npm/v/env2json-converter.svg)](https://www.npmjs.com/package/env2json-converter)
[![GitHub license](https://img.shields.io/github/license/nati-grossman/env2json-converter)](https://github.com/nati-grossman/env2json-converter/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14.0.0-green.svg)](https://nodejs.org/)

A powerful TypeScript library that converts `.env` files to JSON objects with type safety support. Perfect for TypeScript projects that need type-safe environment variable handling.

## 🌟 Features

- ✨ Convert `.env` files to JSON objects
- 🔒 Type-safe environment variable handling
- ✅ Schema validation for required environment variables
- 🚨 Comprehensive error handling
- 📦 Zero runtime dependencies
- 🧪 Full test coverage
- 📝 Detailed TypeScript documentation

## 📦 Installation

```bash
npm install env2json-converter
```

## 🚀 Usage

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

## 📚 API Documentation

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

## 📝 Example `.env` File

```env
DB_HOST=localhost
DB_PORT=5432
API_KEY=secret123
```

## 🛠️ Development

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Links

- [GitHub Repository](https://github.com/nati-grossman/env2json-converter)
- [NPM Package](https://www.npmjs.com/package/env2json-converter)
- [Report a Bug](https://github.com/nati-grossman/env2json-converter/issues)
- [Request a Feature](https://github.com/nati-grossman/env2json-converter/issues)

## 👥 Author

- **Nati Grossman** - [GitHub](https://github.com/nati-grossman)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for type-safe environment variable handling in TypeScript projects

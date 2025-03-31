import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

interface EnvConfig {
  [key: string]: string;
}

/**
 * Converts a .env file to a JSON object
 * @param envPath - Path to the .env file
 * @returns Object containing environment variables
 * @throws Error if the .env file doesn't exist or is invalid
 */
export function envToJson(envPath: string): EnvConfig {
  // Resolve the absolute path
  const absolutePath = path.resolve(envPath);

  // Check if file exists
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Environment file not found at: ${absolutePath}`);
  }

  // Read the .env file
  const envContent = fs.readFileSync(absolutePath, "utf-8");

  // Parse the .env content
  const result = dotenv.parse(envContent);

  // Validate the result
  if (!result || typeof result !== "object") {
    throw new Error("Invalid .env file format");
  }

  return result;
}

/**
 * Converts a .env file to a JSON object with type safety
 * @param envPath - Path to the .env file
 * @param schema - Optional schema to validate environment variables
 * @returns Object containing environment variables
 * @throws Error if the .env file doesn't exist or is invalid
 */
export function envToJsonTyped<T extends EnvConfig>(
  envPath: string,
  schema?: Record<keyof T, string>
): T {
  const result = envToJson(envPath);

  // If schema is provided, validate against it
  if (schema) {
    const missingVars = Object.keys(schema).filter((key) => !(key in result));
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`
      );
    }
  }

  return result as T;
}

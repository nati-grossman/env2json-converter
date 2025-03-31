import { envToJson, envToJsonTyped } from "./index";
import * as fs from "fs";
import * as path from "path";

describe("env2json-converter", () => {
  const testEnvPath = path.join(__dirname, "../test/.env");
  const testEnvContent = `
DB_HOST=localhost
DB_PORT=5432
API_KEY=secret123
`;

  beforeAll(() => {
    // Create test directory and .env file
    const testDir = path.join(__dirname, "../test");
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(testEnvPath, testEnvContent);
  });

  afterAll(() => {
    // Clean up test files
    const testDir = path.join(__dirname, "../test");
    if (fs.existsSync(testEnvPath)) {
      fs.unlinkSync(testEnvPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  describe("envToJson", () => {
    it("should convert .env file to JSON object", () => {
      const result = envToJson(testEnvPath);
      expect(result).toEqual({
        DB_HOST: "localhost",
        DB_PORT: "5432",
        API_KEY: "secret123",
      });
    });

    it("should throw error for non-existent file", () => {
      expect(() => envToJson("nonexistent.env")).toThrow(
        "Environment file not found"
      );
    });

    it("should handle empty .env file", () => {
      const emptyEnvPath = path.join(__dirname, "../test/empty.env");
      fs.writeFileSync(emptyEnvPath, "");
      const result = envToJson(emptyEnvPath);
      expect(result).toEqual({});
      fs.unlinkSync(emptyEnvPath);
    });
  });

  describe("envToJsonTyped", () => {
    interface TestConfig {
      DB_HOST: string;
      DB_PORT: string;
      API_KEY: string;
      [key: string]: string; // Add index signature to satisfy EnvConfig constraint
    }

    it("should convert .env file to typed JSON object", () => {
      const schema: Record<keyof TestConfig, string> = {
        DB_HOST: "string",
        DB_PORT: "string",
        API_KEY: "string",
      };

      const result = envToJsonTyped<TestConfig>(testEnvPath, schema);
      expect(result).toEqual({
        DB_HOST: "localhost",
        DB_PORT: "5432",
        API_KEY: "secret123",
      });
    });

    it("should throw error for missing required variables", () => {
      const schema: Record<keyof TestConfig, string> = {
        DB_HOST: "string",
        DB_PORT: "string",
        API_KEY: "string",
        MISSING_VAR: "string",
      };

      expect(() => envToJsonTyped<TestConfig>(testEnvPath, schema)).toThrow(
        "Missing required environment variables: MISSING_VAR"
      );
    });
  });
});

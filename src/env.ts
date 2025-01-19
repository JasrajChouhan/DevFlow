import { logLevels } from "./lib/logger";

export interface Enivorment {
  NODE_ENV: "development" | "production";
  LOG_LEVEL: keyof typeof logLevels;
  MONGODB_URI: string;
}

// get env

export const getEnv = <K extends keyof Enivorment>(
  k: K,
  fallback?: Enivorment[K]
): Enivorment[K] => {
  const value = process.env[k] as Enivorment[K] | undefined;

  if (!value) {
    if (fallback) {
      return fallback;
    } else {
      throw new Error(`Missing env variable: ${k}`);
    }
  }
  return value;
};

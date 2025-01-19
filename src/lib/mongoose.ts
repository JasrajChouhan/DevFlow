import "@/databse";
import mongoose, { Mongoose } from "mongoose";

import { logger } from "./logger";

import { getEnv } from "@/env";

const MONGODB_URI = getEnv("MONGODB_URI") as string;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

// connection and promise interface
export interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Already connected to MongoDB");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((result) => {
        logger.info("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        logger.error("Error connecting to MongoDB");
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDB;

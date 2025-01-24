// fetchHandler

import { RequestError } from "../http-errors";
import { logger } from "../logger";
import { handleError } from "./error";

import { ActionResponse } from "@/types/global";

const isError = (error: unknown): error is Error => error instanceof Error;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  // default headers
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP error : ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");
    if (error.name === "AbortError") {
      logger.warn(`Request timeout : ${url}`);
    } else {
      logger.error(`Request error : ${url}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}

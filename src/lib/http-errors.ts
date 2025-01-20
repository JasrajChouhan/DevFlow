// Request Error class
export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

// Validation Error
export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formatFieldError(fieldErrors);
    super(400, message, fieldErrors);
  }

  static formatFieldError(errors: Record<string, string[]>) {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

        if (messages[0] === "Required") {
          return `${fieldName} is required`;
        } else {
          return messages.join(" and ");
        }
      }
    );
    return formattedMessages.join(", ");
  }
}

// Not found Error Class
export class NotFoundError extends RequestError {
  constructor(resources: string) {
    super(404, ` ${resources} Not found Error.`);
    this.name = "Error 404.";
  }
}

// Forbidden Error Class
export class ForbiddenError extends RequestError {
  constructor(message: string = "ForbiddenError") {
    super(403, ` ${message}`);
    this.name = "Error Forbidden.";
  }
}

// Unauthorized Error Class
export class UnauthorizedError extends RequestError {
  constructor(message: string = "UnauthorizedError") {
    super(401, ` ${message}`);
    this.name = "Error Unauthorized.";
  }
}

// Conflict Error Class
export class Conflict extends RequestError {
  constructor(message: string = "Conflict") {
    super(429, ` ${message}`);
    this.name = "Error Conflict.";
  }
}

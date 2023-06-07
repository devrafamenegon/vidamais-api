class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

class UnauthorizedAccessError extends Error {
  constructor() {
    super("Unauthorized access");
    this.name = "UnauthorizedAccessError";
  }
}

export { InvalidCredentialsError, UnauthorizedAccessError };
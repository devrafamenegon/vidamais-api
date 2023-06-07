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

class OldPasswordNotInformedError extends Error {
  constructor() {
    super("Old Password Not Informed");
    this.name = "OldPasswordNotInformedError";
  }
}

export {
  InvalidCredentialsError,
  UnauthorizedAccessError,
  OldPasswordNotInformedError,
};

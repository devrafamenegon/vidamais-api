class PatientNotFoundError extends Error {
  constructor() {
    super("Patient not found");
    this.name = "PatientNotFoundError";
  }
}

class MedicineNotFoundError extends Error {
  constructor() {
    super("Medicine not found");
    this.name = "MedicineNotFoundError";
  }
}

class UnauthorizedAccessError extends Error {
  constructor() {
    super("Unauthorized access");
    this.name = "UnauthorizedAccessError";
  }
}

class OnlyDoctorsError extends Error {
  constructor() {
    super("Only doctors can perform this action");
    this.name = "OnlyDoctorsError";
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

class EmailCPFExistsError extends Error {
  constructor() {
    super("Email or CPF already registered");
    this.name = "EmailCPFExistsError";
  }
}

export {
  PatientNotFoundError,
  MedicineNotFoundError,
  UnauthorizedAccessError,
  OnlyDoctorsError,
  InvalidCredentialsError,
  EmailCPFExistsError,
};

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

class OnlyDoctorsError extends Error {
  constructor() {
    super("Only doctors can perform this action");
    this.name = "OnlyDoctorsError";
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
  OnlyDoctorsError,
  EmailCPFExistsError,
};

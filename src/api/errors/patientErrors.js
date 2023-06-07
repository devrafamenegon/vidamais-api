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

class OnlyMedicsError extends Error {
  constructor() {
    super("Only medics can perform this action");
    this.name = "OnlymedicsError";
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
  OnlyMedicsError as OnlyDoctorsError,
  EmailCPFExistsError,
};

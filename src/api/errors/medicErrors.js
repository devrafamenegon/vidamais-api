class MedicNotFoundError extends Error {
  constructor() {
    super("Medic not found");
    this.name = "MedicNotFoundError";
  }
}

class EmailCRMExistsError extends Error {
  constructor() {
    super("Email or CRM already registered");
    this.name = "EmailCRMExistsError";
  }
}

export { MedicNotFoundError, EmailCRMExistsError };

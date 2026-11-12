export class DomainError extends Error {
  readonly code: string;
  readonly httpStatus: number;

  constructor(code: string, httpStatus = 409) {
    super(code);
    this.name = "DomainError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

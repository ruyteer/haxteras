export class NotFoundError extends Error {
  constructor(param: string) {
    super(`${param} doesn't exists. Please, send a valid id!`);
    this.name = "NotFoundError";
  }
}

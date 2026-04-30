export enum StatusCode {
  BadRequest = 400,
  Forbidden = 403,
  InternalServerError = 500,
  NotFound = 404,
  Ok = 200,
  Unauthorized = 401,
}

export enum ErrorCode {
  SessionExpired = 'EXPIRED_SESSION',
  AccountAlreadyActivated = 'ACCOUNT_ALREADY_ACTIVATED',
  Unauthorized = 'UNAUTHORIZED',
}

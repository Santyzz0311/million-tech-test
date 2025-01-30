/**
 * HTTP_STATUS_CODES enumerates common HTTP status codes used in APIs.
 * These codes indicate the result of a client's request to a server.
 */
export enum HTTP_STATUS_CODES {
  /**
   * The request was successful.
   */
  OK = 200,
  /**
   * The request was successful and a resource was created.
   */
  CREATED = 201,
  /**
   * The request was successful but there is no content to send in the response.
   */
  NO_CONTENT = 204,
  /**
   * The server could not understand the request due to invalid syntax.
   */
  BAD_REQUEST = 400,
  /**
   * The client must authenticate itself to get the requested response.
   */
  UNAUTHORIZED = 401,
  /**
   * The client does not have access rights to the content.
   */
  FORBIDDEN = 403,
  /**
   * The server can not find the requested resource.
   */
  NOT_FOUND = 404,
  /**
   * The request conflicts with the current state of the server.
   */
  CONFLICT = 409,
  /**
   * The server understands the content type of the request but cannot process the contained instructions.
   */
  UNPROCESSABLE_ENTITY = 422,
  /**
   * The server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR = 500,
}

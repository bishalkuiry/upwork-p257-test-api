
export enum ResponseStatus {
    SUCCESS = "success",
    ERROR = "error",
    FAIL = "fail",
}


export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    BAD_GATEWAY = 502,
    UNPROCESSABLE_ENTITY = 422,
    CONFLICT = 409,
    TOO_MANY_REQUESTS = 429,
    NOT_IMPLEMENTED = 501,
    MOVED_PERMANENTLY = 301,
}
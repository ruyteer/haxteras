import { httpResponse } from "../protocols";

export function okResponse(body?: any): httpResponse {
  return {
    status: 200,
    body: body,
  };
}

export function badResponse(error: Error): httpResponse {
  return {
    status: 400,
    body: error.message,
  };
}

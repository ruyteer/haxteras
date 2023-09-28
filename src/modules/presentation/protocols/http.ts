export interface httpRequest {
  body: any;
  params: any;
}

export interface httpResponse {
  status: number;
  body?: any;
}

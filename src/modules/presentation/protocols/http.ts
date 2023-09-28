export interface httpRequest {
  body: any;
  params: any;
  files: any;
}

export interface httpResponse {
  status: number;
  body?: any;
}

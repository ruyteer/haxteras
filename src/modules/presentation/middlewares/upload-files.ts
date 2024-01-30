import { IFirebaseUpload } from "../contracts/firebase-upload";
import { badResponse, okResponse } from "../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../protocols";

export class UploadFile implements Controller {
  constructor(private readonly firebaseUpload: IFirebaseUpload) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const files = req.files;

      console.log(files);
      if (!Array.isArray(files) || files.length === 0) {
        return okResponse();
      }

      const fileUrl = await this.firebaseUpload.uploadFile(files);
      req.files.firebaseUrl = fileUrl;

      return okResponse();
    } catch (error) {
      console.log(error);
      return badResponse(error);
    }
  }
}

import { IFirebaseUpload } from "../contracts/firebase-upload";
import { badResponse, okResponse } from "../helpers/http-response";
import { Controller, httpRequest, httpResponse } from "../protocols";

export class UploadFile implements Controller {
  constructor(private readonly firebaseUpload: IFirebaseUpload) {}

  async handle(req: httpRequest): Promise<httpResponse> {
    try {
      const files = req.files;

      if (!files[0]) {
        req.files.firebaseUrl = "comprovante não enviado";
        return okResponse();
      }
      const fileUrl = await this.firebaseUpload.uploadFile(files);
      req.files.firebaseUrl = fileUrl;

      return okResponse();
    } catch (error) {
      console.log("deu erro foi aqui");
      return badResponse(error);
    }
  }
}

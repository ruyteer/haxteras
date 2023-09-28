import { FirebaseUpload } from "../../../../infra/services/firebase/upload";
import { UploadFile } from "../../../../presentation/middlewares/upload-files";
import { Controller } from "../../../../presentation/protocols";

export function makeUploadFile(): Controller {
  const service = new FirebaseUpload();

  return new UploadFile(service);
}

import { FileViewModel } from "../views/file-model";

export interface IFirebaseUpload {
  uploadFile(files: FileViewModel[]): Promise<string[]>;
}

import { IFirebaseUpload } from "../../../presentation/contracts/firebase-upload";
import { FileMulterModel } from "./models/file-multer";
import { bucket } from "./config";

export class FirebaseUpload implements IFirebaseUpload {
  async uploadFile(files: FileMulterModel[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let filesUrls: string[] = [];

      files.map((file) => {
        const newFile = bucket.file(file.originalname);

        const stream = newFile.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        stream.on("error", (error) => {
          reject(new Error(error.message));
        });

        stream.on("finish", async () => {
          await newFile.makePublic();

          const signedUrl = await newFile.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });

          filesUrls.push(signedUrl[0]);
          if (filesUrls.length === files.length) {
            resolve(filesUrls);
          }
        });

        stream.end(file.buffer);
      });
    });
  }
}

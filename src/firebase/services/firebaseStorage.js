import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../config";

const storage = getStorage(app);

const uploadFile = (file, fullFilePath, progressCallback) => {
  const storageRef = ref(storage, fullFilePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observer
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      progressCallback(progress);
    },
    (error) => {
      // On Error
      throw error;
    }
  );

  return uploadTask.then(async () => {
    const downloadUrl = getDownloadURL(uploadTask.snapshot.ref);

    return downloadUrl;
  });
};

const deleteFile = async (fileDownloadUrl) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  const filePath = decodedUrl.substring(startIndex, endIndex);
  const storageRef = ref(storage, filePath);

  await deleteObject(storageRef);
};

export { uploadFile, deleteFile };

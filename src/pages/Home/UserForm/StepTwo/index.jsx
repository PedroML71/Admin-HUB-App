import React, { useState, useRef, useEffect, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import {
  uploadFile,
  deleteFile,
} from "../../../../firebase/services/firebaseStorage";
import { useUpdateUsuarioMutation } from "../../../../store/services/hubApi";
import { AuthContext } from "../../../../context";

const StepTwo = ({ closeEditModalHandler, errorHandler }) => {
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const fileInputRef = useRef();
  const [updateUsuario] = useUpdateUsuarioMutation();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.user?.imageUrl) {
      setCurrentImageUrl(auth?.user?.imageUrl);
    } else {
      setUploadProgress(-1);
      setCurrentImageUrl("");
      fileInputRef.current.value = null;
    }
  }, [auth?.user?.imageUrl]);

  const fileChangedHandler = async (event) => {
    const files = event.target.files;
    const file = files[0];

    if (!file) {
      errorHandler("Deu ruim! tenta de novo!");
      return;
    }

    const generatedFileId = uuidv4();

    try {
      const downloadUrl = await uploadFile(
        file,
        `users/${generatedFileId}`,
        setUploadProgress
      );

      setUploadImageUrl(downloadUrl);
    } catch (error) {
      setUploadProgress(-1);
      fileInputRef.current.value = null;
      errorHandler(error.message);
      throw error;
    }
  };

  const cancelImageHandler = async () => {
    await deleteFile(uploadImageUrl);
    setUploadImageUrl("");
    setUploadProgress(-1);
    closeEditModalHandler();
  };

  const submitImageHandler = () => {
    const body = { imageUrl: uploadImageUrl };

    updateUsuario({ usuarioId: auth?.user?.id, body })
      .unwrap()
      .then((response) => {
        auth?.setUser((prevState) => {
          const user = { ...prevState };

          user.imageUrl = response?.data?.usuario?.imageUrl;

          return user;
        });

        closeEditModalHandler();
      })
      .catch((error) => errorHandler(error.data.message));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Preview */}
      <div className="w-32 self-center">
        {uploadImageUrl ? (
          <img
            className="w-full"
            src={uploadImageUrl}
            alt="imagem do usuario"
          />
        ) : currentImageUrl && !uploadImageUrl ? (
          <img
            className="w-full"
            src={currentImageUrl}
            alt="imagem do usuario"
          />
        ) : (
          <UserCircleIcon className="w-full text-dark-blue" />
        )}
      </div>

      {/** Input */}
      <div className="flex justify-center gap-4">
        {!uploadImageUrl && (
          <>
            <button
              className={`flex justify-center items-center bg-light-blue rounded-sm p-4 text-light-grey ${
                uploadProgress > -1 && "hidden"
              }`}
              title="Upload Imagem"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-base font-bold">Upload</span>
            </button>

            <input
              className="hidden"
              type={"file"}
              ref={fileInputRef}
              onChange={fileChangedHandler}
            />
          </>
        )}

        {uploadImageUrl ? (
          <button
            className="bg-light-blue rounded-sm p-4 text-light-grey"
            onClick={submitImageHandler}
          >
            <span className="text-base font-bold">Aceitar</span>
          </button>
        ) : null}

        {uploadImageUrl ? (
          <button
            className="bg-light-blue rounded-sm p-4 text-light-grey"
            onClick={cancelImageHandler}
          >
            <span className="text-base font-bold">Cancelar</span>
          </button>
        ) : null}
      </div>

      {/** Progress */}
      {!uploadImageUrl && uploadProgress > -1 ? (
        <div className="flex flex-col items-center">
          <label htmlFor="file">Carregando: {uploadProgress}%</label>
          <div className="text-dark-yellow">
            <div className="border-t-transparent w-16 h-16 border-4 border-light-yellow border-solid rounded-full animate-spin" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

StepTwo.propTypes = {
  closeEditModalHandler: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
};

export default StepTwo;

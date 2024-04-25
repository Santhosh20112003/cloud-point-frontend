import React, { useState, useEffect, useContext } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { storage } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import UploadModal from "./UploadModal";
import { useUserAuth } from "../context/UserAuthContext";
import { MyContext } from "./Structure";
import { getCurrentTimeInUTCFormat, ParseDate } from "../../common/methods";
import { useRef } from "react";

const ImageUploader = () => {
  const { calculateTotalFileSize, totalSize, totalSizePercent } =
    useContext(MyContext);
  const imagepoped = useRef(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useUserAuth();
  const [copySuccess, setCopySuccess] = useState("");
  const [loading, setloading] = useState(false);

  const fetchImages = async () => {
    try {
      setloading(true);
      const imagesRef = ref(storage, user.email);
      const images = await listAll(imagesRef);
      const urls = await Promise.all(
        images.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          return {
            url,
            id: uuidv4(),
            name: metadata.name,
            size: metadata.size,
            timeCreated: metadata.timeCreated,
            contentType: metadata.contentType,
            showDropdown: false,
          };
        })
      );
      urls.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
      setImgUrl(urls);
    } catch (error) {
      console.log("Error fetching images:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    calculateTotalFileSize();
    const handleBeforeUnload = (event) => {
      if (uploading) {
        event.preventDefault();
        event.returnValue = "";

        const result = window.confirm("Are you sure you want to proceed?");
        if (result) {
          window.location.reload();
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user.email, ref]);

  const handleUpload = async (uploadedImgs) => {
    try {
      const updatedImgUrl = [...imgUrl];
      setUploading(true);

      const maxSize = 100 * 1024 * 1024; // 100 MB
      const existingFileNames = new Set(updatedImgUrl.map((file) => file.name));

      for (let i = 0; i < uploadedImgs.length; i++) {
        const uploadedImg = uploadedImgs[i];
        const filename = uploadedImg.name;
        const nameWithoutExtension = filename.split(".").slice(0, -1).join(".");
        let name = nameWithoutExtension;
        let counter = 1;

        while (existingFileNames.has(name)) {
          name = `${nameWithoutExtension} (copy ${counter})`;
          counter++;
        }

        const fileType = uploadedImg.type;
        if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
          const size =
            updatedImgUrl.reduce((acc, file) => acc + file.size, 0) +
            uploadedImg.size;

          if (size <= maxSize) {
            const imgRef = ref(storage, `${user.email}/${name}`);
            const uploadTask = uploadBytes(imgRef, uploadedImg);

            toast.promise(
              uploadTask,
              {
                loading: "Uploading file...",
                success: "File uploaded successfully!",
                error: "Failed to upload file",
              },
              {
                position: "top-center",
              }
            );

            const snapshot = await uploadTask;
            const url = await getDownloadURL(snapshot.ref);

            const file = {
              url,
              id: uuidv4(),
              name,
              timeCreated: getCurrentTimeInUTCFormat(),
              size: uploadedImg.size,
              contentType: uploadedImg.type,
              showDropdown: false,
            };

            updatedImgUrl.push(file);
            existingFileNames.add(name);
            calculateTotalFileSize();
          } else {
            toast.error("File Size Exceeds Limit", { position: "top-center" });
          }
        } else {
          toast.error("Invalid File Type", { position: "top-center" });
        }
      }

      updatedImgUrl.sort(
        (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
      );
      setImgUrl(updatedImgUrl);
      setUploading(false);
      return true;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading files:", error);

      toast.error("An error occurred while uploading the files", {
         position: "top-center" 
      });

      return false;
    }
  };

  const handleDelete = async (id, url) => {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      setImgUrl((data) => data.filter((image) => image.id !== id));
      toast.success("File Deleted Successfully", { position: "top-center" });
      calculateTotalFileSize();
      console.log("Success");
    } catch (error) {
      toast.error("Unable to deleting file ", { position: "top-center" });
      console.log("Error deleting :", error);
    }
  };

  const handleCopy = (dataVal) => {
    navigator.clipboard.writeText(dataVal.url);
    setCopySuccess(dataVal.url);
    setTimeout(() => {
      setCopySuccess("");
      toggleDropdown(dataVal.id);
    }, 1000);
  };


  const toggleDropdown = (id) => {
    setImgUrl((data) =>
      data.map((image) => {
        if (image.id === id) {
          return { ...image, showDropdown: !image.showDropdown };
        }
        return { ...image, showDropdown: false };
      })
    );
  };

  const bytesToMB = (bytes) => {
    if (bytes === 0) return "0 MB";
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;

    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  };

  return (
    <div className="md:container mx-auto px-8 w-full bg-white h-[90vh] overflow-y-scroll max-h-[90vh]">
      {!loading ? (
        <span>
          <div className="flex justify-between items-center mt-8 mb-4">
            <span className="flex items-start flex-col justify-center gap-3">
              <span className="block">Total Size: {bytesToMB(totalSize)}</span>
              <span className="flex items-center justify-center">
                <div className="lg:w-[400px] w-[120px] bg-gray-200 flex rounded-full me-3 h-3.5">
                  <div
                    className="bg-[#049be7] h-3.5 rounded-s-full"
                    style={{ width: `${totalSizePercent}%` }}
                  ></div>
                </div>
                {`${totalSizePercent.toFixed(1)}%`}
              </span>
            </span>
            <UploadModal handleUpload={handleUpload} bytesToMB={bytesToMB} />
          </div>
          <div
            className={`flex flex-wrap items-start justify-center ${
              imgUrl.length > 0 && "lg:grid lg:grid-cols-3"
            }  gap-5 w-full md:px-5 my-8`}
          >
            {imgUrl.length > 0 ? (
              imgUrl.map((dataVal) => (
                <div
                  key={dataVal.id}
                  className="border border-1 rounded-xl border-slate-300 p-2 w-full lg:w-auto "
                >
                  <div className="flex bg-gray-100 rounded-t-lg items-center justify-between p-2">
                    <h1 className="p-2 uppercase flex gap-3 items-center justify-center">
                      {dataVal.contentType
                        .replace(/(image|video|application)\//, "")
                        .slice(0, 6)
                        .replace("+", "")
                        .replace(".", "")}
                      <span className="text-xs">
                        {ParseDate(dataVal.timeCreated)}
                      </span>
                    </h1>
                    <div className="relative inline-block text-left">
                      <button
                        className="bg-gray-100 text-gray-800 mr-2"
                        onClick={() => toggleDropdown(dataVal.id)}
                      >
                        <i
                          className={`fa-solid fa-ellipsis active:scale-75 transition-all rotate-90`}
                        ></i>
                      </button>
                      {dataVal.showDropdown && (
                        <ul className="origin-top-center absolute right-3 mt-2 w-40 rounded-md shadow-lg z-40 bg-white ring-1 ring-black ring-opacity-5">
                          {copySuccess === dataVal.url ? (
                            <li
                              className="py-1 px-2 hover:bg-green-200 bg-green-100"
                              onClick={() => handleCopy(dataVal)}
                            >
                              Copied!
                            </li>
                          ) : (
                            <li
                              className="py-1 px-2 hover:bg-gray-100 "
                              onClick={() => handleCopy(dataVal)}
                            >
                              Copy Url
                            </li>
                          )}
                          <li className="py-1 px-2 lg:block hidden active:bg-gray-100 active:text-gray-500 hover:bg-gray-100 rounded-b-md">
                            <a
                              href={dataVal.url}
                              download={dataVal.name}
                              className="w-full text-left"
                            >
                              Download
                            </a>
                          </li>
                          <li className="py-1 px-2 active:bg-red-200 active:text-red-500 hover:bg-gray-100 rounded-b-md">
                            <button
                              onClick={() => {
                                handleDelete(dataVal.id, dataVal.url);
                                toggleDropdown("");
                              }}
                              className="w-full text-left"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <div className="flex items-center justify-center ">
                        {dataVal.contentType.includes("image") ? (
                          <img
                            src={dataVal.url}
                            alt="uploaded-img"
                            className="w-full bg-gray-50 max-h-[200px] object-contain"
                          />
                        ) : dataVal.contentType.includes("video") ? (
                          <video
                            src={dataVal.url}
                            alt="uploaded-img"
                            className="w-full max-h-[200px]"
                          ></video>
                        ) : (
                          <div className="max-w-[250px] min-w-[200px] max-h-[200px] min-h-[200px] bg-gray-50 flex items-center justify-center flex-col px-5">
                            <i className="fas fa-file h-32 w-16 text-gray-400"></i>
                            {dataVal.contentType
                              .replace("application/", "")
                              .replace("-", "")
                              .slice(0, 10)}
                          </div>
                        )}
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 z-[100000]" />
                      <Dialog.Content className="z-[100000000] data-[state=open]:animate-contentShow fixed rounded-md top-[50%] left-[50%] md:w-fit w-[90vw] max-h-[80vh] md:max-h-none  translate-x-[-50%] p-5 translate-y-[-50%]  bg-white focus:outline-none">
                        <span className="flex mb-3 items-start justify-center flex-col">
                          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            {dataVal.name.length > 15
                              ? `${dataVal.name.slice(0, 18)}...`
                              : `${dataVal.name}.${dataVal.contentType
                                  .replace("image/", "")
                                  .replace("video/", "")
                                  .slice(0, 4)}`}
                          </Dialog.Title>
                          <h1 className="text-mauve12 m-0 text-[13px]">
                            <span className="font-normal">
                              {bytesToMB(dataVal.size)}
                            </span>{" "}
                            {` - `} {ParseDate(dataVal.timeCreated)}
                          </h1>
                        </span>
                        {dataVal.contentType.includes("image") ? (
                          <span className="relative">
                            <img
                              ref={imagepoped}
                              src={dataVal.url}
                              alt="uploaded-img"
                              className="w-full h-auto  max-h-[50vh]  rounded-lg bg-gray-50   object-contain"
                            />
                            <button
                              onClick={() => {
                                const elem = imagepoped.current;
                                if (elem) {
                                  if (elem.requestFullscreen) {
                                    elem.requestFullscreen();
                                  } else if (elem.webkitRequestFullscreen) {
                                    elem.webkitRequestFullscreen();
                                  } else if (elem.msRequestFullscreen) {
                                    elem.msRequestFullscreen();
                                  }
                                }
                              }}
                              className="absolute bottom-3 bg-[#21212170] active:bg-gray-500 active:scale-90 transition-all py-1 px-2 rounded-lg right-3 text-gray-50 hover:text-white focus:outline-none"
                            >
                              <i className="fas fa-expand"></i>
                            </button>
                          </span>
                        ) : dataVal.contentType.includes("video") ? (
                          <video
                            controls
                            src={dataVal.url}
                            alt="uploaded-img"
                            className="w-full max-h-[50vh] rounded-lg bg-gray-50 h-auto  object-cover"
                          ></video>
                        ) : (
                          <div className="w-full bg-gray-50 rounded-lg max-h-[50vh] h-auto  object-cover flex items-center justify-center flex-col px-5">
                            <i className="fas fa-file h-32 w-16 text-gray-400"></i>
                            {dataVal.contentType
                              .replace("application/", "")
                              .replace("-", "")
                              .slice(0, 10)}
                          </div>
                        )}
                        <div className="flex justify-end gap-[25px]"></div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <div className="text-center py-2 bg-gray-100 rounded-b-lg">
                    <h1
                      title={dataVal.name}
                      className="text-md beak-all font-semibold"
                    >
                      {dataVal.name.length > 15
                        ? `${dataVal.name.slice(0, 15)}...`
                        : `${dataVal.name}.${dataVal.contentType
                            .replace("image/", "")
                            .replace("video/", "")
                            .slice(0, 4)}`}
                    </h1>
                    <h1 className="text-sm mt-1">{bytesToMB(dataVal.size)}</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center w-full h-[60vh] py-5 my-5 justify-center flex-col">
                <img
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="NO API KEY"
                  className="w-44"
                />
                <p className="text-base">Not Yet Uploaded Anything...</p>
              </div>
            )}
          </div>
        </span>
      ) : (
        <div className=" flex justify-center h-[90vh] items-center ">
          <i className="fas fa-gear animate-spin text-5xl text-gray-800"></i>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ImageUploader;

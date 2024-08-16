import React, { useState, useEffect } from "react";

const UploadModal = ({ handleUpload, bytesToMB }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [err, setErr] = useState(false);
  const [fileon, setFileOn] = useState(false);
  const [previewURLs, setPreviewURLs] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    const handleBeforeUnload = (event) => {
      if (fileon) {
        event.preventDefault();
        event.returnValue = "";

        const result = window.confirm("Are you sure you want to proceed?");
        if (result) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [fileon]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    const validFiles = fileArray.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length > 0) {
      setFileOn(true);
      setSelectedFiles(validFiles);
      setErr(false);

      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewURLs(urls);
    } else {
      setFileOn(false);
      setSelectedFiles([]);
      setErr(true);
      setPreviewURLs([]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);

    const validFiles = fileArray.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length > 0) {
      if (selectedFiles.length > 0) {
        setSelectedFiles([...selectedFiles, ...validFiles]);
      } else {
        setFileOn(true);
        setSelectedFiles(validFiles);
        setErr(false);

        const urls = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewURLs(urls);
      }
    } else {
      setFileOn(false);
      setSelectedFiles([]);
      setErr(true);
      setPreviewURLs([]);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedURLs = previewURLs.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewURLs(updatedURLs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFiles.length > 0) {
      setErr(false);
      let response = handleUpload(selectedFiles);
      if (response) {
        setSelectedFiles([]);
        setShowModal(false);
      } else {
        setShowModal(true);
        setErr(true);
      }
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="px-4 py-2  active:scale-90 border-2 border-white outline outline-[3px] outline-[#049be7] transition-all bg-[#049be7] text-center text-white rounded-full"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Upload File
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden backdrop-brightness-75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-[90%] max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between mb-5">
                <h1 className="text-xl">Upload Files</h1>
                <button
                  className="text-gray-500 hover:text-gray-700 active:scale-95 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {selectedFiles.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4 overflow-y-auto h-[300px]">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center flex-col ">
                      {file.type.startsWith("image/") ? (
                        <div className="relative">
                          <img
                            src={previewURLs[index]}
                            alt="Preview"
                            className="max-h-60 rounded"
                          />
                          <button
                            className="absolute top-1 bg-[#21212180] active:bg-gray-600 active:scale-90 transition-all p-1  rounded-full right-1 text-gray-50 hover:text-white  focus:outline-none"
                            onClick={() => removeImage(index)}
                          >
                            <svg
                              className="lg:w-3 lg:h-3 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <video
                            src={previewURLs[index]}
                            alt="Preview"
                            className="max-h-60 rounded"
                            controls
                          />
                          <button
                            className="absolute top-1 bg-[#21212180] active:bg-gray-600 active:scale-90 transition-all p-1  rounded-full right-1 text-gray-50 hover:text-white  focus:outline-none"
                            onClick={() => removeImage(index)}
                          >
                            <svg
                              className="lg:w-3 lg:h-3 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      <p className="mt-1 text-sm">{bytesToMB(file.size)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="flex items-center flex-col gap-2 mb-4 h-60 border-dashed border-2 rounded-lg border-gray-300 p-4"
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">
                      Drag and Drop Files here ,browse files
                    </span>
                  </div>
                </div>
              )}
              <form className="flex items-center justify-center gap-2 mb-3">
                <input
                  type="file"
                  accept="image/*, video/*"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none"
                >
                  Upload
                </button>
              </form>
              {err && (
                <span className="text-sm text-red-500">
                  *No files selected or file size exceeds the limit
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;

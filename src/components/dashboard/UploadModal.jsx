import React, { useState, useEffect } from 'react';

const UploadModal = ({ handleUpload, bytesToMB }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [err, setErr] = useState(false);
  const [fileon,setfileon] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };
  
    const handleBeforeUnload = (event) => {
     if(fileon){
      event.preventDefault();
      event.returnValue = '';
  
      const result = window.confirm('Are you sure you want to proceed?');
      if (result) {
        window.location.reload();
      }
     }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleFileChange = (event) => {
    setfileon(false)
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      setErr(false);
      setPreviewURL(URL.createObjectURL(file));
      setfileon(true)
    } else {
      setSelectedFile(null);
      setErr(true);
      setPreviewURL(null);
    }
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      setErr(false);
      let response = handleUpload(selectedFile);
      if (response) {
        setSelectedFile(null);
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
        className="px-4 py-2 active:scale-90 transition-all bg-[#00aaff] text-white rounded shadow-lg focus:outline-none hover:bg-[#049ce8]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden backdrop-brightness-75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between mb-5">
                <h1 className="text-xl">Upload File</h1>
                <button
                  className="text-gray-500 hover:text-gray-700 active:scale-95 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {selectedFile ? (
                <div className="flex items-center flex-col mb-4">
                  {selectedFile.type.startsWith('image/') ? (
                    <img src={previewURL} alt="Preview" className="max-h-60  rounded" />
                  ) : (
                    <video src={previewURL} alt="Preview" className="max-h-60 rounded" controls />
                  )}
                  <p className="text-sm">{bytesToMB(selectedFile.size)}</p>
                </div>
              ) : (
                <div className="flex items-center flex-col gap-2 mb-4">
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center"
                  >
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">No files selected</span>
                  </li>
                </div>
              )}
              <form className="flex items-center justify-center gap-2 mb-3">
                <input
                  type="file"
                  accept="image/*, video/*"
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
              {err && <span className="text-sm text-red-500">*File is not selected or file size is exceed</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;
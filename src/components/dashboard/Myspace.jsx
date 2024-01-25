import React, { useState, useEffect, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import UploadModal from './UploadModal';
import { useUserAuth } from '../context/UserAuthContext';
import { MyContext } from './Structure';

const ImageUploader = () => {
  const {calculateTotalFileSize ,totalSize ,totalSizePercent} = useContext(MyContext);
  const [imgUrl, setImgUrl] = useState([]);
  const [uploading,setUploading] = useState(false);
  const { user } = useUserAuth();
  const [copySuccess, setCopySuccess] = useState('');
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
            contentType: metadata.contentType,
            showDropdown: false,
          };
        })
      );
      setImgUrl(urls);
    } catch (error) {
      console.log('Error fetching images:', error);
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
        event.returnValue = '';

        const result = window.confirm('Are you sure you want to proceed?');
        if (result) {
          window.location.reload();
        }
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user.email, ref]);


  const handleUpload = async (uploadedImgs) => {
    try {
      const updatedImgUrl = [...imgUrl];
      setUploading(true);
  
      for (let i = 0; i < uploadedImgs.length; i++) {
        const uploadedImg = uploadedImgs[i];
        const filename = uploadedImg.name;
        const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
        let name = nameWithoutExtension;
        let counter = 1;
  
        let existingFile = updatedImgUrl.find((file) => file.name === name);
        while (existingFile) {
          name = `${nameWithoutExtension} (copy ${counter})`;
          counter++;
          existingFile = updatedImgUrl.find((file) => file.name === name);
        }
  
        const fileType = uploadedImg.type;
        if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
          const size =
            updatedImgUrl.reduce((acc, file) => acc + file.size, 0) + uploadedImg.size;
          const maxSize = 100 * 1024 * 1024; // 100 MB
  
          if (size <= maxSize) {
            const imgRef = ref(storage, `${user.email}/${name}`);
            const uploadTask = uploadBytes(imgRef, uploadedImg);
  
            toast.promise(uploadTask, {
              pending: 'Uploading file...',
              success: 'File uploaded successfully!',
              error: 'Failed to upload file',
            },{
              position: 'bottom-right',
              theme: 'light',
            });
  
            const snapshot = await uploadTask;
            const url = await getDownloadURL(snapshot.ref);
  
            const file = {
              url,
              id: uuidv4(),
              name,
              size: uploadedImg.size,
              contentType: uploadedImg.type,
              showDropdown: false,
            };
  
            updatedImgUrl.push(file);
            calculateTotalFileSize();
          } else {
            toast.error('File Size Exceeds Limit', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        } else {
          toast.error('Invalid File Type', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
  
      setImgUrl(updatedImgUrl);
      setUploading(false);
      return true;
    } catch (error) {
      setUploading(false);
      console.error('Error uploading files:', error);
  
      toast.error('An error occurred while uploading the files', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  
      return false;
    }
  };


  const handleDelete = async (id, url) => {
    try {
      const storageRef = ref(storage, url);
      const metadata = await getMetadata(storageRef);
      await deleteObject(storageRef);
      setImgUrl((data) => data.filter((image) => image.id !== id));
      calculateTotalFileSize();
      console.log('Success');
    } catch (error) {
      console.log('Error deleting video:', error);
    }
  };

  const handleCopy = (dataVal) => {
    navigator.clipboard.writeText(dataVal.url);
    setCopySuccess(dataVal.url);
    setTimeout(() => {
      setCopySuccess('');
      toggleDropdown(dataVal.id)
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
    if (bytes === 0) return '0 MB';

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
              <div className="bg-[#049be7] h-3.5 rounded-s-full" style={{ width: `${totalSizePercent}%` }}></div>
            </div>
            {`${totalSizePercent.toFixed(1)}%`}
          </span>
        </span>
        <UploadModal handleUpload={handleUpload} bytesToMB={bytesToMB} />
      </div>
        <div className={`flex flex-wrap items-start justify-center ${ imgUrl.length > 0 && 'lg:grid lg:grid-cols-3'}  gap-5 w-full md:px-5 my-8`}>
          {imgUrl.length > 0 ? imgUrl.map((dataVal) => (
            <div key={dataVal.id} className="border border-1 rounded-xl border-slate-300 p-2 w-full lg:w-auto ">
              <div className="flex bg-gray-100 rounded-t-lg items-center justify-between p-2">
                <h1 className="p-2 uppercase">{dataVal.contentType.replace(/(image|video|application)\//, '').slice(0, 6).replace('+', '').replace('.', '')}</h1>
                <div className="relative inline-block text-left">
                  <button className="bg-gray-100 text-gray-800 mr-2" onClick={() => toggleDropdown(dataVal.id)}>
                    <i className={`fa-solid fa-ellipsis active:scale-75 transition-all rotate-90`}></i>
                  </button>
                  {dataVal.showDropdown && (
                    <ul className="origin-bottom-right absolute right-3 mt-2 w-40 rounded-md shadow-lg z-40 bg-white ring-1 ring-black ring-opacity-5">
                      {copySuccess === dataVal.url ? (
                        <li className="py-1 px-2 hover:bg-green-200 bg-green-100" onClick={() => handleCopy(dataVal)}>
                          Copied!
                        </li>
                      ) : (
                        <li className="py-1 px-2 hover:bg-gray-100 " onClick={() => handleCopy(dataVal)}>
                          Copy Url
                        </li>
                      )}
                      <li className="py-1 px-2 lg:block hidden active:bg-gray-100 active:text-gray-500 hover:bg-gray-100 rounded-b-md">
                        <a href={dataVal.url} download={dataVal.name} className="w-full text-left">
                          Download
                        </a>
                      </li>
                      <li className="py-1 px-2 active:bg-red-200 active:text-red-500 hover:bg-gray-100 rounded-b-md">
                        <button onClick={() => { handleDelete(dataVal.id, dataVal.url); toggleDropdown('') }} className="w-full text-left">
                          Delete
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="lg:flex hidden items-center justify-center ">
                {dataVal.contentType.includes('image') ? (
                  <img src={dataVal.url} alt="uploaded-img"  className="w-full bg-gray-50 max-h-[200px] object-contain" />
                ) : dataVal.contentType.includes('video') ? (
                  <video src={dataVal.url} alt="uploaded-img" className="w-full max-h-[200px]"></video>
                ) : (
                  <div className="max-w-[250px] min-w-[200px] max-h-[200px] min-h-[200px] bg-gray-50 flex items-center justify-center flex-col px-5">
                    <i className="fas fa-file h-32 w-16 text-gray-400"></i>
                    {dataVal.contentType.replace('application/', '').replace('-', '').slice(0, 10)}
                  </div>
                )}
              </div>
              <a href={dataVal.url} download={dataVal.name} className="flex lg:hidden items-center justify-center ">
                {dataVal.contentType.includes('image') ? (
                  <img src={dataVal.url} alt="uploaded-img"  className="w-full bg-gray-50 max-h-[200px] object-contain" />
                ) : dataVal.contentType.includes('video') ? (
                  <video src={dataVal.url} alt="uploaded-img" className="w-full max-h-[200px]"></video>
                ) : (
                  <div className="max-w-[250px] min-w-[200px] max-h-[200px] min-h-[200px] bg-gray-50 flex items-center justify-center flex-col px-5">
                    <i className="fas fa-file h-32 w-16 text-gray-400"></i>
                    {dataVal.contentType.replace('application/', '').replace('-', '').slice(0, 10)}
                  </div>
                )}
              </a>
              <div className="text-center py-2 bg-gray-100 rounded-b-lg">
                <h1 title={dataVal.name} className="text-md beak-all font-semibold">
                  {dataVal.name.length > 15 ? `${dataVal.name.slice(0, 15)}...` : `${dataVal.name}.${dataVal.contentType.replace('image/', '').replace('video/', '').slice(0, 4)}`}
                </h1>
                <h1 className="text-sm mt-1">{bytesToMB(dataVal.size)}</h1>
              </div>
            </div>
          )) : <div className="flex items-center w-full h-[60vh] py-5 my-5 justify-center flex-col">
          <img src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png' alt="NO API KEY" className="w-44" />
          <p className="text-base">Not Yet Uploaded Anything...</p>
        </div>}
        </div>
		</span>
      ) : (
        <div className=" flex justify-center h-[90vh] items-center ">
          <i className="fas fa-gear animate-spin text-5xl text-gray-800"></i>
        </div>
      )}
	  <ToastContainer />
    </div>
  );
};

export default ImageUploader;

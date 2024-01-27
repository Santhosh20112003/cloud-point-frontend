import React, { useContext, useEffect, useState } from 'react';
import { random_login_img } from '../../common/links';
import * as Tabs from '@radix-ui/react-tabs';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';
import { getDownloadURL, getMetadata, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useUserAuth } from '../context/UserAuthContext';
import { storage } from '../../config/firebase';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { MyContext } from './Structure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [blur, setBlur] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [grayscale, setGrayscale] = useState(false);
  const [invert, setInvert] = useState(false);
  const [sepia, setSepia] = useState(false);
  const [editedImage, setEditedImage] = useState(null);
  const [filename, setFilename] = useState('');
  const { calculateTotalFileSize, totalSize, totalSizePercent } = useContext(MyContext);
  const [uploading, setUploading] = useState(false);

  const { user } = useUserAuth();

  useEffect(() => {
    fetchImages();
  }, [user]);

  const fetchImages = async () => {
    try {
      setLoading(true);
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
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (selectedImageUrl) => {
    setSelectedImage(selectedImageUrl);
  };

  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement('a');
      link.href = editedImage;
      link.download = 'edited_image.png';
      link.click();
    }
  };

  const handleUpload = async (uploadedImg, filename) => {
    try {
      setUploading(true);
      const updatedImgUrl = [...imgUrl];
  
      const { name: originalName, type: fileType, size: fileSize } = uploadedImg;
  
      const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
      let name = nameWithoutExtension;
      let counter = 1;
  
      while (updatedImgUrl.some((file) => file.name === name)) {
        name = `${nameWithoutExtension} (copy ${counter++})`;
      }
  
      if (!fileType || typeof fileType !== 'string') {
        throw new Error('Invalid File Type');
      }
  
      if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
        const totalSize = updatedImgUrl.reduce((acc, file) => acc + file.size, 0) + fileSize;
        const maxSize = 100 * 1024 * 1024; // 100 MB
  
        if (totalSize <= maxSize) {
          const imgRef = ref(storage, `${user.email}/${name}`);
          const uploadTask = uploadBytes(imgRef, uploadedImg);
  
          toast.promise(uploadTask, {
            pending: 'Uploading file...',
            success: 'File uploaded successfully!',
            error: 'Failed to upload file',
          }, {
            position: 'bottom-right',
            theme: 'light',
          });
  
          const snapshot = await uploadTask;
          const url = await getDownloadURL(snapshot.ref);
  
          const file = {
            url,
            id: uuidv4(),
            name,
            size: fileSize,
            contentType: fileType,
            showDropdown: false,
          };
  
          updatedImgUrl.push(file);
          calculateTotalFileSize();
        } else {
          throw new Error('File Size Exceeds Limit');
        }
      } else {
        throw new Error('Invalid File Type');
      }
  
      setImgUrl(updatedImgUrl);
      setUploading(false);
      return true;
    } catch (error) {
      setUploading(false);
      console.error('Error uploading file:', error);
  
      toast.error(`An error occurred while uploading the file: ${error.message}`, {
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
  




  const applyStyles = () => {
    let filter = '';

    if (brightness) filter += `brightness(${brightness}%) `;
    if (blur) filter += `blur(${blur}px) `;
    if (contrast) filter += `contrast(${100 - contrast}%) `;
    if (saturation) filter += `saturate(${100 - saturation}%) `;
    if (grayscale) filter += 'grayscale(100%) ';
    if (invert) filter += 'invert(100%) ';
    if (sepia) filter += 'sepia(100%) ';

    return {
      filter: filter.trim(),
    };
  };

  const ResetFilters = () => {
    setBrightness(100);
    setContrast(0);
    setBlur(0);
    setSaturation(0);
    setGrayscale(false);
    setInvert(false);
    setSepia(false);

  }

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(selectedImage, { mode: 'no-cors' });
        const blob = await response.blob();
        const dataURL = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        setEditedImage(dataURL);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    if (selectedImage) {
      loadImage();
    }
  }, [selectedImage, brightness, blur, contrast, saturation, grayscale, invert, sepia]);

  return (
    <div className="w-full md:h-screen md:max-h-screen max-h-[90vh] h-[90vh] bg-white md:bg-gray-200">
      <header className="w-full h-[10vh] flex items-center justify-between px-5 py-8 bg-[#3897f0]">
        <h1 className="text-2xl text-white font-bold inline-flex items-center justify-center gap-2">
          <span className="lg:hidden">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="">
                  <i className="fas fa-bars"></i>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal >
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[90vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <div className="w-full h-full block bg-gray-50  px-3 py-2 divide-y-2 overflow-y-scroll">
                    <h1 className="text-xl text-mauve11 text-center w-full py-3 px-2 font-semibold">Your Images</h1>
                    <div className="px-3 pt-5 pb-3 images overflow-y-scroll flex flex-col gap-5 items-center justify-center">
                      {imgUrl.map((item,index) => (
                        item.contentType.startsWith('image/') && (
                          <Dialog.Close asChild>
                            <img
                              key={index}
                              src={item.url}
                              alt=""
                              className={`w-full brightness-90 rounded-md ${selectedImage === item.url ? 'border-2 border-white outline outline-[#3897f0]' : ''}`}
                              onClick={() => { handleImageSelect(item.url); }}
                            />
                          </Dialog.Close>
                        )
                      ))}
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </span>
          <i className="fas lg:flex hidden fa-photo-film"></i> Ai Studio
        </h1>
        <span className="flex items-center justify-center">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="px-5 py-2 active:scale-90 transition-all rounded-full shadow-md bg-white outline-none border-none">
                Save
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                  Save Image To Cloud
                </Dialog.Title>
                <fieldset className="w-full mt-5 gap-5">
                  <span className="mb-[15px] flex items-center  justify-center">
                    <label className="text-gray-500 mr-3 w-[90px] text-right text-[15px]" htmlFor="name">
                      File Name
                    </label>
                    <input
                      className="text-gray-500 shadow-[#3897f0] focus:shadow-[#3897f0] inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id="name"
                      value={filename}
                      onChange={(e) => { setFilename(e.target.value) }}
                      required
                    />
                  </span>
                  <span className="flex items-center mt-10 mb-5 justify-center w-full ">
                    <img
                      src={selectedImage || ''}
                      alt=""
                      className="w-auto shadow-lg h-80 overflow-auto rounded-md"
                      style={applyStyles()}
                    />
                  </span>
                </fieldset>

                <div className="mt-[25px] flex justify-end">
                  <Dialog.Close asChild>
                    <button className="bg-green4 text-green11 hover:bg-green5  inline-flex h-[35px] items-center justify-center rounded-[4px] bg-gray-200 text-gray-500 px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button onClick={() => { handleUpload(selectedImage, filename) }} className="bg-[#3897f0] text-white  inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] ml-3 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                      Save
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-gray-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <button onClick={() => { ResetFilters() }} className="px-5 ml-3 py-2 active:scale-90 transition-all rounded-full shadow-md bg-gray-200 outline-none border-none">
            Reset
          </button>
        </span>
      </header>
      <div className="w-full h-[90vh] flex bg-white">
        <div className="min-h-full lg:w-[75%] w-full bg-blue-200">
          <div className="min-h-[80vh] h-[80vh] w-full flex bg-blue-400">
            <div className="min-h-full w-[30%] lg:block hidden bg-gray-50 min-w-[200px] px-3 py-2 divide-y-2 overflow-y-scroll">
              <h1 className="text-xl text-mauve11 text-center w-full py-3 px-2 font-semibold">Your Images</h1>
              <div className="px-3 pt-5 pb-3 images overflow-y-scroll flex flex-col gap-5 items-center justify-center">
                {imgUrl.map((item) => (
                  item.contentType.startsWith('image/') && (
                    <img
                      key={item.id}
                      src={item.url}
                      alt=""
                      className={`w-full brightness-90 rounded-md ${selectedImage === item.url ? 'border-2 border-white outline outline-[#3897f0]' : ''}`}
                      onClick={() => handleImageSelect(item.url)}
                    />
                  )
                ))}
              </div>
            </div>
            <div className="min-h-full w-full lg:w-[70%] flex items-center justify-center bg-[url('https://ik.imagekit.io/vituepzjm/dot-pattern-background-vector.jpg?updatedAt=1706296982341')] bg-gray-200 bg-contain relative shadow-inner">

              <img
                src={selectedImage || ''}
                alt=""
                className="w-auto shadow-lg h-80 overflow-auto rounded-md"
                style={applyStyles()}
              />

              <button
                onClick={handleDownload}
                className="px-3.5 py-2 cursor-pointer bg-blue-100 text-blue-500 text-md font-semibold font-display rounded-full active:scale-95 transition-all fa-solid fa-download lg:hidden absolute bottom-3 right-3"
              ></button>


              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="px-3.5 py-2 cursor-pointer bg-blue-100 text-blue-500 text-md font-semibold font-display rounded-full active:scale-95 transition-all  lg:hidden absolute top-3 right-3">
                    <i className="fa-solid fa-sliders"></i>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
                      <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
                        <Dialog.Close asChild>
                          <Tabs.Trigger
                            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none font-semibold data-[state=active]:text-blue-500 data-[state=active]:bg-blue-100 outline-none cursor-default "
                            value="tab1"
                          >
                            <i className="fa-solid fa-sliders mr-2"></i> Edit
                          </Tabs.Trigger>
                        </Dialog.Close>

                      </Tabs.List>
                      <Tabs.Content className="grow p-5 bg-white outline-none" value="tab1">
                        <div className="mb-10">
                          <h1 className="text-lg font-semibold">Brightness</h1>
                          <Slider.Root className="relative flex items-center select-none w-full h-5"
                            value={[brightness]}
                            max={200}
                            step={1}
                            onValueChange={(value) => { setBrightness(value) }}>
                            <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                              <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                              className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                              aria-label="Volume"
                            />
                          </Slider.Root>
                        </div>
                        <div className="my-10">
                          <h1 className="text-lg font-semibold">Blur</h1>
                          <Slider.Root className="relative flex items-center select-none w-full h-5"
                            value={[blur]}
                            max={50}
                            step={1}
                            onValueChange={(value) => { setBlur(value) }}>
                            <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                              <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                              className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                              aria-label="Volume"
                            />
                          </Slider.Root>
                        </div>
                        <div className="my-10">
                          <h1 className="text-lg font-semibold">Contrast</h1>
                          <Slider.Root className="relative flex items-center select-none w-full h-5" value={[contrast]}
                            max={100}
                            step={1}
                            onValueChange={(value) => { setContrast(value) }}>
                            <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                              <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                              className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                              aria-label="Volume"
                            />
                          </Slider.Root>
                        </div>
                        <div className="my-10">
                          <h1 className="text-lg font-semibold">Saturate</h1>
                          <Slider.Root className="relative flex items-center select-none w-full h-5" value={[saturation]}
                            max={100}
                            step={1}
                            onValueChange={(value) => { setSaturation(value) }}>
                            <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                              <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                              className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                              aria-label="Volume"
                            />
                          </Slider.Root>
                        </div>
                        <div className="my-10">
                          <div className="flex items-center">
                            <Switch.Root
                              className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                              id="airplane-mode"
                              value={[grayscale]}
                              onCheckedChange={(value) => { setGrayscale(value); console.log(value) }}
                              style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
                            >
                              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                            </Switch.Root>
                            <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                              Grayscale
                            </label>
                          </div>
                        </div>
                        <div className="my-10">
                          <div className="flex items-center">
                            <Switch.Root
                              className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                              id="airplane-mode"
                              value={[invert]}
                              onCheckedChange={(value) => { setInvert(value) }}
                              style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
                            >
                              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                            </Switch.Root>
                            <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                              Invert
                            </label>
                          </div>
                        </div>
                        <div className="mt-10">
                          <div className="flex items-center">
                            <Switch.Root
                              className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                              id="airplane-mode"
                              value={[sepia]}
                              onCheckedChange={(value) => { setSepia(value) }}

                            >
                              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                            </Switch.Root>
                            <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                              Sepia
                            </label>
                          </div>
                        </div>
                      </Tabs.Content>

                    </Tabs.Root>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>


            </div>
          </div>
          <div className="min-h-[10vh] max-h-[100px] px-3 py-2 h-[10vh] w-full bg-blue-100">
            <form>
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="default-search"
                  className="block p-4 pl-3 w-full text-sm text-gray-800 bg-gray-50 rounded-lg border outline-none border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Describe What you want..."
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-[#3897f0] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="min-h-full w-[25%] min-w-[250px] lg:flex hidden bg-green-400">
          <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
            <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none font-semibold data-[state=active]:text-blue-500 data-[state=active]:bg-blue-100 outline-none cursor-default "
                value="tab1"
              >
                <i className="fa-solid fa-sliders mr-2"></i> Edit
              </Tabs.Trigger>

            </Tabs.List>
            <Tabs.Content className="grow p-5 bg-white outline-none" value="tab1">
              <div className="mb-10">
                <h1 className="text-lg font-semibold">Brightness</h1>
                <Slider.Root className="relative flex items-center select-none w-full h-5"
                  value={[brightness]}
                  max={200}
                  step={1}
                  onValueChange={(value) => { setBrightness(value) }}>
                  <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
              <div className="my-10">
                <h1 className="text-lg font-semibold">Blur</h1>
                <Slider.Root className="relative flex items-center select-none w-full h-5"
                  value={[blur]}
                  max={50}
                  step={1}
                  onValueChange={(value) => { setBlur(value) }}>
                  <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
              <div className="my-10">
                <h1 className="text-lg font-semibold">Contrast</h1>
                <Slider.Root className="relative flex items-center select-none w-full h-5" value={[contrast]}
                  max={100}
                  step={1}
                  onValueChange={(value) => { setContrast(value) }}>
                  <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
              <div className="my-10">
                <h1 className="text-lg font-semibold">Saturate</h1>
                <Slider.Root className="relative flex items-center select-none w-full h-5" value={[saturation]}
                  max={100}
                  step={1}
                  onValueChange={(value) => { setSaturation(value) }}>
                  <Slider.Track className="bg-blackA3 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-blue-300 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA1"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
              <div className="my-10">
                <div className="flex items-center">
                  <Switch.Root
                    className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                    id="airplane-mode"
                    value={[grayscale]}
                    onCheckedChange={(value) => { setGrayscale(value); console.log(value) }}
                    style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
                  >
                    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                    Grayscale
                  </label>
                </div>
              </div>
              <div className="my-10">
                <div className="flex items-center">
                  <Switch.Root
                    className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                    id="airplane-mode"
                    value={[invert]}
                    onCheckedChange={(value) => { setInvert(value) }}
                    style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
                  >
                    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                    Invert
                  </label>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center">
                  <Switch.Root
                    className="w-[42px] h-[25px] bg-blackA6 rounded-full relative data-[state=checked]:bg-[#3897f0] outline-none"
                    id="airplane-mode"
                    value={[sepia]}
                    onCheckedChange={(value) => { setSepia(value) }}

                  >
                    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <label className="text-mauve11 text-lg leading-none pl-[15px]" htmlFor="Grayscale">
                    Sepia
                  </label>
                </div>
              </div>
            </Tabs.Content>

          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default Overview;

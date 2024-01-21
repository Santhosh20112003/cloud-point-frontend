import React, { useState, useEffect } from 'react';
import { deleteUser } from 'firebase/auth';
import { useUserAuth } from '../context/UserAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import 'react-toastify/dist/ReactToastify.css';
import { profile_banner } from '../../common/links';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

function Profile() {
  const { user, logOut } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, user.email);
        const images = await listAll(imagesRef);
        const urls = await Promise.all(
          images.items.map(async (item) => {
            const metadata = await getMetadata(item);
  
            if (metadata.contentType.startsWith('image/')) {
              const url = await getDownloadURL(item);
              return {
                url,
                id: uuidv4(),
                name: metadata.name,
                size: metadata.size,
                contentType: metadata.contentType,
                showDropdown: false,
              };
            }
          })
        );
        setFiles(urls.filter(Boolean));
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, [user]);

  const handleDeleteAccount = async () => {
    setIsBtnLoading(true);

    try {
      await deleteUser(user);
      localStorage.removeItem('token');
      window.location.href = '/home';
      console.log("Account Deleted");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    toast.error(error.message.replace('Firebase: Error ', '').replace(/[()]/g, '').replace('.', ''), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.error(error);
  };

  return (
    <div className='w-full md:h-screen md:max-h-screen max-h-[90vh] h-[90vh] bg-white md:bg-gray-200 flex items-center justify-center'>
      <div className="relative flex flex-col profile overflow-y-scroll overflow-x-hidden items-center md:rounded-[20px] w-full md:mx-5 h-[85vh] md:h-[95vh] p-4 bg-white bg-clip-border md:shadow-lg shadow-gray-300">
        <div className="relative flex min-h-[200px] md:min-h-[250px] md:h-[250px]  w-full justify-center rounded-xl bg-cover">
          <img src={profile_banner} className="absolute flex h-full w-full justify-center  rounded-xl brightness-75 bg-gray-300" />
          <h4 className="text-2xl lg:text-4xl uppercase hidden break-all md:block z-20 absolute bottom-2 left-[150px] font-bold text-white ">
            {user.displayName}
          </h4>

          <div className="z-20 absolute top-3 right-3">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-3 py-2 bg-[#98d6ed] border-1 border-[#80cde8] hidden md:block text-gray-800 text-md font-semibold font-display rounded-lg">
              Action <i className="fas mt-1 fa-angle-down"></i>
            </button>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-3.5 py-2 md:hidden bg-blue-100 text-blue-500 text-md font-semibold font-display rounded-full active:scale-95 transition-all">
              <i className="fa-solid fa-ellipsis mt-1 rotate-90"></i>
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right z-30 absolute right-0 mt-2 w-48 px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <div
                    className="block w-full text-start px-4 cursor-pointer rounded-md py-2 text-sm mt-1  hover:bg-blue-200"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Edit
                  </div>

                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <button className="w-full text-start px-4 rounded-md py-2 text-sm mt-1  hover:bg-red-200 inline-flex items-center gap-2">
                        Delete My account
                      </button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                          This action cannot be undone. This will permanently delete{' '}
                          <span className="font-semibold">{user.email}</span> account and remove your data from our servers.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action asChild>
                            <button onClick={handleDeleteAccount} className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Yes, delete account
                            </button>
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <button
                    onClick={(e) => {
                      localStorage.removeItem('token');
                      logOut();
                      window.location.href = '/home';
                    }}
                    className=" w-full text-start px-4 rounded-md py-2 text-sm my-1  hover:bg-blue-200 inline-flex items-center gap-2"
                    role="menuitem"
                  >
                    Sign out <i className="fas fa-arrow-right-from-bracket text-gray-500"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="absolute -bottom-12 md:-bottom-13 md:left-[30px] flex h-28 w-28 items-center justify-center rounded-full border-[4px] border-white ">
            <img className="h-full w-full rounded-full" src={user.photoURL} alt="" />
            {user.emailVerified && <img src={require('../assert/verified.png')} alt="verified" className="absolute -bottom-1 right-0.5 w-7 rounded-full " />}
          </div>
        </div>

        <div className="mt-16 md:ml-10 md:w-full flex flex-col justify-center md:items-start items-center ">
          <h4 className="text-xl break-all hidden md:inline-flex items-center font-bold text-navy-700 ">{user.uid} <span className="bg-gray-200 ml-2 px-2 py-1 text-sm rounded-xl text-gray-500">userid</span> </h4>
          <h4 className="text-xl break-words text-center md:hidden font-bold text-navy-700 ">{user.displayName}</h4>
          <h4 className="text-xl text-center break-all md:hidden mt-3 font-bold text-navy-700 ">{user.uid} </h4>
          <p className="text-lg lg:ms-2 break-all font-normal mt-1 text-gray-600">{user.email}</p>
        </div>

        {loading ? (
          <div className="flex w-full items-center justify-center h-[40vh] pb-4" >
            <svg className={`animate-spin h-10 w-10 text-[#00a1e1]`} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (files.length > 0 ? (
          <div className="mt-10 h-[40vh] w-full">
            <h1 className="text-xl hidden md:block font-semibold ms-5">Recent Files</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-3 ">
              {files.slice(0, 4).map((data) => (
                <div className="p-4" key={data.id}>
                  <div className={`h-52 w-[1fr] bg-gray-500 relative rounded-lg overflow-hidden shadow-lg`}>
                    <img src={data.url} alt="" className="w-full h-full object-cover relative brightness-[58%]" />
                    <span className="absolute md:left-[5%] mx-5 text-gray-50 top-[35%] pb-3">
                      <h1 className="inline-flex break-all items-center pe-3 gap-2 md:text-2xl text-3xl font-bold mb-3">{data.name.length > 20 ? `${data.name.slice(0, 20)}...` : `${data.name}.${data.contentType.replace("image/",'')}`} </h1>
                      
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center py-5 my-5 justify-center flex-col">
            <img src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png' alt="NO API KEY" className="w-44" />
            <p className="text-base">Not Yet Uploaded Anything...</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;

import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useUserAuth } from '../context/UserAuthContext';
import { storage } from '../../config/firebase';
import { random_login_img } from '../../common/links';

function Editor() {
	const [open, setOpen] = useState(false);
	const [loading, setloading] = useState(false);
	const [imgUrl, setImgUrl] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const { user } = useUserAuth();
  
	const fetchImages = async () => {
	  try {
		setloading(true);
		const imagesRef = ref(storage, user.email);
		const images = await listAll(imagesRef);
		const urls = await Promise.all(
		  images.items.map(async (item) => {
			console.log(item)
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
	}, [user]);
  
  
	const handleImageSelect = (selectedImageUrl) => {
	  setSelectedImage(selectedImageUrl);
	};
	return (
		<div className='w-full h-[90vh] flex'>
			<div className="w-[80%] h-[90vh] ">
				<FilerobotImageEditor
					source={selectedImage || random_login_img}
					onSave={(editedImageObject, designState) =>
						console.log('saved', editedImageObject, designState)
					}
					// onClose={closeImgEditor}
					annotationsCommon={{
						fill: '#ff0000',
					}}
					Text={{ text: 'Prathiksha...' }}
					Rotate={{ angle: 90, componentType: 'slider' }}
					Crop={{
						presetsItems: [
							{
								titleKey: 'classicTv',
								descriptionKey: '4:3',
								ratio: 4 / 3,
							},
							{
								titleKey: 'cinemascope',
								descriptionKey: '21:9',
								ratio: 21 / 9,
							},
						],
						presetsFolders: [
							{
								titleKey: 'socialMedia',
								groups: [
									{
										titleKey: 'facebook',
										items: [
											{
												titleKey: 'profile',
												width: 180,
												height: 180,
												descriptionKey: 'fbProfileSize',
											},
											{
												titleKey: 'coverPhoto',
												width: 820,
												height: 312,
												descriptionKey: 'fbCoverPhotoSize',
											},
										],
									},
								],
							},
						],
					}}
					tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
					defaultTabId={TABS.ANNOTATE}
					defaultToolId={TOOLS.TEXT}
				/>
			</div>
			<div className="w-[20%] h-[90vh] bg-gray-50 min-w-[200px] px-3 py-2 divide-y-2 overflow-y-scroll">
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
		</div>
	);
}


export default Editor;
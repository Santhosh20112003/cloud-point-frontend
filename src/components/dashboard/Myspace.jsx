import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import UploadModal from './UploadModal';
import { useUserAuth } from '../context/UserAuthContext';


const ImageUploader = () => {
	const [imgUrl, setImgUrl] = useState([]);
	const { user } = useUserAuth();
	const [copySuccess, setCopySuccess] = useState('');
	const [totalSize, setTotalSize] = useState(0);
	const [totalSizePercent, setTotalSizePercent] = useState(0);

	const fetchImages = async () => {
		try {
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
		}
	};

	const calculateTotalFileSize = async () => {
		try {
			const storageRef = ref(storage, user.email);
			const files = await listAll(storageRef);

			let totalSize = 0;

			for (const file of files.items) {
				const metadata = await getMetadata(file);
				totalSize += metadata.size;
			}
			setTotalSize(totalSize);
			const maxTotalSize = 100 * 1024 * 1024; // 100MB
			const totalSizePercent = (totalSize / maxTotalSize) * 100;
			setTotalSizePercent(totalSizePercent);
		} catch (error) {
			console.error('Error calculating total file size:', error);
			setTotalSize(0);
			setTotalSizePercent(0);
		}
	};

	useEffect(() => {
		fetchImages();
		calculateTotalFileSize();
	}, [user.email, ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata]);

	const handleUpload = (uploadedImg) => {
		const filename = uploadedImg.name;
		const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
		let name = nameWithoutExtension;
		let counter = 1;
	  
		let existingFile = imgUrl.find((file) => file.name === name);
		while (existingFile) {
		  name = `${nameWithoutExtension} (copy ${counter})`;
		  counter++;
		  existingFile = imgUrl.find((file) => file.name === name);
		}
	  
		const fileType = uploadedImg.type;
		if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
		  const totalSize = imgUrl.reduce((acc, file) => acc + file.size, 0) + uploadedImg.size;
		  const maxSize = 100 * 1024 * 1024; // 100 MB
	  
		  if (totalSize <= maxSize) {
			const imgRef = ref(storage, `${user.email}/${name}`);
			uploadBytes(imgRef, uploadedImg).then((snapshot) => {
			  getDownloadURL(snapshot.ref).then((url) => {
				const file = {
				  url,
				  id: uuidv4(),
				  name,
				  size: uploadedImg.size,
				  contentType: uploadedImg.type,
				  showDropdown: false,
				};
				setImgUrl((data) => [...data, file]);
				calculateTotalFileSize();
			  });
			});
			return true;
		  } else {
			return false;
		  }
		} else {
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
			console.log("Success");

		} catch (error) {
			console.log('Error deleting video:', error);
		}
	};

	const handleCopy = (url) => {
		navigator.clipboard.writeText(url);
		setCopySuccess(url);
		setTimeout(() => {
			setCopySuccess('');
		}, 2000);
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
		<div className="container mx-auto px-8 w-full h-[90vh] overflow-y-scroll max-h-[90vh]">
			<div className="flex justify-between items-center mt-8 mb-4">
				<span className="flex items-start flex-col justify-center gap-3">
					<span className="block">Total Size: {bytesToMB(totalSize)}</span>
					<span className="flex items-center justify-center">
						<div className="lg:w-[400px] w-[100px] bg-gray-200 flex rounded-full me-3 h-3.5">
							<div className="bg-[#049be7] h-3.5 rounded-s-full" style={{ width: `${totalSizePercent}%` }}></div>
						</div>
						{`${totalSizePercent.toFixed(1)}%`}
					</span>
				</span>
				<UploadModal handleUpload={handleUpload} bytesToMB={bytesToMB} />
			</div>
			<div className="flex flex-wrap items-start justify-center lg:justify-stretch gap-5 px-5 my-8">
				{imgUrl.map((dataVal) => (
					<div key={dataVal.id} className="border border-1 border-slate-400 p-2 w-[200px] sm:w-[230px] lg:w-[260px]">
						<div className="flex bg-gray-200 items-center justify-between p-2">
							<h1 className="p-2 uppercase">{dataVal.contentType.replace(/(image|video|application)\//, '').slice(0, 6).replace("+", "").replace(".", "")}</h1>
							<div className="relative inline-block text-left">
								<button className="bg-gray-200 text-gray-800 mr-2" onClick={() => toggleDropdown(dataVal.id)}>
									<i className={`fa-solid fa-ellipsis active:scale-75 transition-all rotate-90`}></i>
								</button>
								{dataVal.showDropdown && (
									<ul className="origin-top-right absolute right-0 mt-2 w-40 rounded-b-md shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5">
										{copySuccess === dataVal.url ? (
											<li className="py-1 px-2 hover:bg-green-200 bg-green-100" onClick={() => handleCopy(dataVal.url)}>
												Copied!
											</li>
										) : (
											<li className="py-1 px-2 hover:bg-gray-100 " onClick={() => handleCopy(dataVal.url)}>
												Copy Url
											</li>
										)}
										<li className="py-1 px-2 active:bg-gray-200 active:text-gray-500 hover:bg-gray-100 rounded-b-md">
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
						<div className="flex items-center justify-center mt-4">
							{dataVal.contentType.includes('image') ? (
								<img src={dataVal.url} alt="uploaded-img" className="w-full bg-gray-50 max-h-[200px] object-contain" />
							) : dataVal.contentType.includes('video') ? (
								<video src={dataVal.url} alt="uploaded-img" className="w-full max-h-[200px]"></video>
							) : (
								<div className="max-w-[250px] min-w-[200px] max-h-[200px] min-h-[200px] bg-gray-50 flex items-center justify-center flex-col px-5">
									<i className="fas fa-file h-32 w-16 text-gray-400"></i>
									{dataVal.contentType.replace('application/', '').replace("-", "").slice(0, 10)}
								</div>
							)}
						</div>
						<div className="text-center mt-4">
							<h1 title={dataVal.name} className="text-md font-semibold">{dataVal.name.length > 20 ? `${dataVal.name.slice(0, 20)}...` : dataVal.name}</h1>
							<h1 className="text-sm mt-1">{bytesToMB(dataVal.size)}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageUploader;

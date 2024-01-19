import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useUserAuth } from '../context/UserAuthContext';


const storage = getStorage();


const ImageUploader = () => {
	const { user } = useUserAuth();
	const [img, setImg] = useState(null);
	const [imgUrl, setImgUrl] = useState([]);
	const [copySuccess, setCopySuccess] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const imagesRef = ref(storage, user.email);
				const images = await listAll(imagesRef);
				const urls = await Promise.all(
					images.items.map(async (item) => {
						const url = await getDownloadURL(item);
						const metadata = await getMetadata(item);
						console.log(metadata)
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
				setLoading(false);
			} catch (error) {
				console.log('Error fetching images:', error);
			}
		};
		fetchImages();
	}, []);


	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};


	const handleClick = () => {
		if (img !== null) {
			const filename = img.name;
			const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
			let name = nameWithoutExtension;
			let counter = 1;


			let existingFile = imgUrl.find((file) => file.name === name);
			while (existingFile) {
				name = `${nameWithoutExtension} (copy ${counter})`;
				counter++;
				existingFile = imgUrl.find((file) => file.name === name);
			}

			let imgRef = ref(storage, `${user.email}/${name}`);
			uploadBytes(imgRef, img).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					const file = {
						url,
						id: uuidv4(),
						name,
						size: img.size,
						contentType: img.type,
						showDropdown: false,
					};
					setImgUrl((data) => [...data, file]);
					setImg(null);
				});
			});
		}

	};


	const handleDelete = async (id, url) => {
		try {
			await deleteObject(ref(storage, url));
			setImgUrl((data) => data.filter((image) => image.id !== id));
		} catch (error) {
			console.log('Error deleting image:', error);
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
		<div className="h-[90vh] overflow-y-scroll">
			<input type="file" onChange={handleChange} className="mb-4" />
			<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1">
				Upload
			</button>
			<div className="flex flex-wrap items-center md:justify-center lg:justify-start gap-5 px-5 my-8">
				{imgUrl.map((dataVal) => (
					<div key={dataVal.id} className="border border-1 border-slate-400">
						<span className="flex bg-gray-200 items-center justify-between">
							<h1 className="p-2 uppercase ">{dataVal.contentType.replace(/(image|video|application)\//, '').slice(0,4).replace("+","").replace(".","") }</h1>
							<div className="relative inline-block text-left dropdown">
								<button
									className="bg-gray-200 text-gray-800 mr-2"
									onClick={() => toggleDropdown(dataVal.id)}
								>
									<i className={`fa-solid fa-ellipsis active:scale-75 transition-all rotate-90 `}></i>
								</button>
								{dataVal.showDropdown && (
									<ul className="origin-top-right absolute right-0 mt-2 w-40 rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
										{copySuccess === dataVal.url ? (
											<li
												className="py-1 px-2 hover:bg-green-200 bg-green-100"
												onClick={() => handleCopy(dataVal.url)}
											>
												Copied!
											</li>
										) : (
											<li
												className="py-1 px-2 hover:bg-gray-100 "
												onClick={() => handleCopy(dataVal.url)}
											>
												Copy Url
											</li>
										)}


										<li className="py-1 px-2 active:bg-red-200 active:text-red-500 hover:bg-gray-100 rounded-b-md">
											<button onClick={() => handleDelete(dataVal.id, dataVal.url)} className="w-full text-left ">
												Delete
											</button>
										</li>
									</ul>
								)}
							</div>
						</span>
						<span className="">
						{dataVal.contentType.includes('image') ? (
							<img src={dataVal.url} alt="uploaded-img" className="max-w-[250px] bg-gray-50 max-h-[200px] min-h-[200px]" />
						) : (
							dataVal.contentType.includes('video') ? (
								<video src={dataVal.url} alt="uploaded-img" className="w-full max-h-[200px]  min-h-[200px]"></video>
							) : (
								<div className="max-w-[250px] min-w-[200px] max-h-[200px] min-h-[200px] bg-gray-50 flex items-center justify-center">
									<i className="fas fa-file h-32 w-16 text-gray-400"></i>
								</div>
							)
						)}
						</span>
						<span className="">
						<h1 className="text-md  text-center mt-3 font-semibold">{dataVal.name.length > 20 ? `${dataVal.name.slice(0, 20)}...` : dataVal.name}</h1>
							<h1 className="text-sm text-center mt-1 mb-3">{bytesToMB(dataVal.size)} </h1>
						</span>
					</div>
				))}
			</div>
		</div>

	);
};


export default ImageUploader;
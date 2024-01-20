import React from "react";
import ReactProfile from "react-profile";
import "react-profile/themes/default.min.css";


function App() {
const [imageUrl, setImageUrl] = React.useState("");


const handleImageLoad = () => {
const image = new Image();
image.src = imageUrl;
image.onload = () => {
const canvas = document.createElement("canvas");
canvas.width = image.width;
canvas.height = image.height;
const context = canvas.getContext("2d");
context.drawImage(image, 0, 0);
const dataUrl = canvas.toDataURL();
console.log(dataUrl);
};
};


const handleChange = (event) => {
setImageUrl(event.target.value);
};


return (
<div>
<input type="text" value={imageUrl} onChange={handleChange} />
<button onClick={handleImageLoad}>Load Image</button>
<ReactProfile
className="w-[200px] h-[300px]"
src={imageUrl}
onDone={(data) => {
console.log(data.getDataURL());
}}
/>
</div>
);
}


export default App;
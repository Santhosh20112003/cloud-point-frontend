import React, { useState } from "react";
import ReactProfile from "react-profile";
import "react-profile/themes/default.min.css";


function App() {
const [imageUrl, setImageUrl] = useState("");




return (
<div>
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
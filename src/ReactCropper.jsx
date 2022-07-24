import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
import { saveAs } from "file-saver";

export const ReactCropper = () => {
  const downloadImage = (imageUrl) => {
    saveAs(imageUrl, "image.jpg"); // Put your image url here.
  };
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(()=>{
    setImage(newImage)
  },[aspectRatio])
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setNewImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      downloadImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="Cropper"> 
      
      {!image ? 
      <div className="upload-container">
        <input type="file" name="" id="" onChange={onChange}  />
      </div>
      :
      <div className="image-cropper">
        <div className="crop-container">

        <Cropper
        className="crop-box"
          // style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          aspectRatio={aspectRatio}
          initialAspectRatio={aspectRatio}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
          />
          </div>
          <div className="crop-btns">
            <label>Aspect Ratio</label> 
            <select  onChange={(e)=>{
              setImage(null)
              setAspectRatio(e.target.value)
              console.log(aspectRatio)}} value={aspectRatio} id="" placeholder="aspect ration">
              <option value={1/1}>1 : 1</option>
              <option value={4/5}>4 : 5</option>
              <option value={16/9}>16 : 9</option>
            </select>
            <button onClick={getCropData}>Download</button>
          </div>
          <button className="close-btn" onClick={()=>setImage(null)}> X </button>
      </div>}`
    </div>
  );
};

export default ReactCropper;

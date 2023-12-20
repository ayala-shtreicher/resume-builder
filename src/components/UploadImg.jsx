import { useState ,useEffect} from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseconfig';
import { v4 } from 'uuid';
import LoadingIcons from 'react-loading-icons'
import Puff from 'react-loading-icons/dist/esm/components/puff';


const UpImage = ({ handleImage }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [status, setStatus] = useState(false);

  const uploadImage = async (e) => {
    setStatus(true)
    e.preventDefault();
    try {
      if (imageUpload === null) return;

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);

      let imageUrl=null;
      await getDownloadURL(imageRef).then((data)=>{
        setStatus(false)
         imageUrl = data;
      });

      handleImage(imageUrl);
      //alert(`Image uploaded successfully! URL: ${imageUrl}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUpload(selectedImage);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} placeholder="upload" />
      <LoadingIcons.Bars />
      <h2>tgyhu</h2>
      <Puff />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default UpImage;
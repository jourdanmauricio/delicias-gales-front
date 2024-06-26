import { useState } from 'react';
import uploadFiles from '@/utils/api/files/uploadFiles';
import { useProductStore } from '@/store/product.store';
import { Actions } from '@/utils/types/tables/actions.enum';

const useUploadFile = ({ handleCancel }) => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const product = useProductStore(state => state.product);
  const updproduct = useProductStore(state => state.updProduct);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevImages => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files)
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevImages => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const handleUpload = async () => {
    if (images.length > 0) {
      const formData = new FormData();

      console.log("Images", images)

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      // try
      setLoading(true);
      const response = await uploadFiles(formData);
      setLoading(false);
      console.log("Response", response)
      const newImages = [];
      for (const image of response) {
        const { asset_id, secure_url } = image;
        newImages.push({ action: Actions.NEW, id: asset_id, secureUrl: secure_url });
      }
      updproduct('images', [...product.images, ...newImages]);
      handleCancel();
    }
  }

  return { images, loading, handleDrop, handleFileSelect, handleUpload }
}
export default useUploadFile
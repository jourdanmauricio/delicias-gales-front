import { axiosApi } from '../api';

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const uploadFiles = async (data: any) => {
  const url = `${urlBase}/files/upload-files`;

  try {
    console.log("uploadFiles data", data)
    const response = await axiosApi.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    let message = '';
    if (error.response.data.message) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
    throw message;
  }
};

export default uploadFiles;
import { axiosApi } from '../api';

const getBrands = async (url?: string) => {
  try {
    const response = await axiosApi.get('/brands');

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

export default getBrands;
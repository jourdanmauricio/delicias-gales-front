import { axiosApi } from '../api';

const createProduct = async (changes) => {
  try {
    const response = await axiosApi.post(
      `/products`, changes
    );
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

export default createProduct;

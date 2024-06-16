import { axiosApi } from '../api';

const newBrand = async (changes) => {
  try {
    const response = await axiosApi.post(
      '/brands', changes
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

export default newBrand;

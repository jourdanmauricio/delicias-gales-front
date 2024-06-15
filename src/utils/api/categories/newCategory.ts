import { axiosApi } from '../api';

const newCategory = async (data) => {
  try {
    const response = await axiosApi.post(
      '/categories', data
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

export default newCategory;

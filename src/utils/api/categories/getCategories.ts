import { axiosApi } from '../api';

const getCategories = async () => {
  try {
    const response = await axiosApi.get('/categories');

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

export default getCategories;
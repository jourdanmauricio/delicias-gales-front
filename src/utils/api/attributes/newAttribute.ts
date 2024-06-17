import { axiosApi } from '../api';

const newAttribute = async (data) => {
  try {
    const response = await axiosApi.post(
      '/attributes', data
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

export default newAttribute;
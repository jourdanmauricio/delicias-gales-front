import { axiosApi } from '../api';

const getAllSettings = async () => {
  try {
    const response = await axiosApi.get('/settings');

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

export default getAllSettings;

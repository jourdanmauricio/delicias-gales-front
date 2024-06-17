import { axiosApi } from '../api';

const createUser = async (data) => {
  try {
    const response = await axiosApi.post(
      '/users', data
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

export default createUser;

import { axiosApi } from '../api';

const removeBrand = async (id: string) => {
  try {
    const response = await axiosApi.delete(`/brands/${id}`);
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

export default removeBrand;
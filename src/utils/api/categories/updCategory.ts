import { axiosApi } from '../api';

const updCategory = async (id: string, changes) => {
  try {
    const response = await axiosApi.put(
      `/categories/${id}`, changes
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

export default updCategory;

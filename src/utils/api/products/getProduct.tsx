import { axiosApi } from '../api';

const getProduct = async (id: string) => {

  console.log("getCategory", id)
  try {
    const response = await axiosApi.get(`/products/${id}`);

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

export default getProduct;
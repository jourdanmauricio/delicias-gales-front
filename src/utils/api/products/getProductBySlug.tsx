import { axiosApi } from '../api';

const getProductBySlug = async (slug: string) => {

  try {
    const response = await axiosApi.get(`/products/find-by-slug/${slug}`);

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

export default getProductBySlug;
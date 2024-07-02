import { axiosApi } from "../api";

const newOrder = async (data) => {
  try {
    const response = await axiosApi.post("/orders", data);
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    let message = "";
    if (error.response.data.message) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
    throw message;
  }
};

export default newOrder;

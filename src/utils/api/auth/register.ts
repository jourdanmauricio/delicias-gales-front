import axios from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const postRegister = async(data: any) => {
  const url = `${urlBase}/auth/signup`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

export default postRegister;

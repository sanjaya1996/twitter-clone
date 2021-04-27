import { AxiosError } from 'axios';

export const getApiErrorMessage = (err: AxiosError) => {
  let message = 'Something Went Wrong';
  if (err.response && err.response.data.message) {
    message = err.response.data.message;
  } else if (err.message) {
    message = err.message;
  }

  return message;
};

import axios, { AxiosRequestConfig } from 'axios';
import { RegisterUserDataType } from '../store/actions/user/userActionTypes';

type TokenType = string | undefined;

const apiURL = 'http://localhost:5000/api';

const getConfigWithToken = (token: TokenType): AxiosRequestConfig => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// USERS
export const registerUser = (path: string, userInfo: RegisterUserDataType) =>
  axios.post(`${apiURL}/${path}`, userInfo);

export const loginUser = (
  path: string,
  loginDetails: { email: string; password: string }
) => axios.post(`${apiURL}/${path}`, loginDetails);

export const getUserInfo = (path: string, token: TokenType) =>
  axios.get(`${apiURL}/${path}`, getConfigWithToken(token));

// POSTS
export const fetchPosts = (path: string, token: TokenType) =>
  axios.get(`${apiURL}/${path}`, getConfigWithToken(token));

export const createPost = (path: string, content: string, token: TokenType) =>
  axios.post(`${apiURL}/${path}`, { content }, getConfigWithToken(token));

export const likePost = (path: string, token: TokenType) =>
  axios.put(`${apiURL}/${path}`, {}, getConfigWithToken(token));

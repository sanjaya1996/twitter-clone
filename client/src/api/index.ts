import axios, { AxiosRequestConfig } from 'axios';

type TokenType = string | undefined;

const domain = 'http://localhost:5000';

const getConfigWithToken = (token: TokenType): AxiosRequestConfig => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// POSTS
export const fetchPosts = (path: string, token: TokenType) =>
  axios.get(`${domain}/${path}`, getConfigWithToken(token));

export const createPost = (path: string, content: string, token: TokenType) =>
  axios.post(`${domain}/${path}`, { content }, getConfigWithToken(token));

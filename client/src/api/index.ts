import axios from 'axios';
import { RegisterUserDataType } from '../store/actions/user/userActionTypes';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  const userInfoJSON = localStorage.getItem('userInfo');
  if (userInfoJSON) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfoJSON).token}`;
  }
  return req;
});

// USERS
export const registerUser = (userInfo: RegisterUserDataType) =>
  API.post('/api/users', userInfo);

export const loginUser = (loginDetails: { email: string; password: string }) =>
  API.post('/api/users/login', loginDetails);

export const getUserInfo = () => API.get('/api/users/myprofile');

// POSTS
export const fetchPosts = () => API.get('/api/posts');

export const createPost = (content: string) =>
  API.post('/api/posts', { content });

export const likePost = (id: string) => API.put(`/api/posts/${id}/like`);

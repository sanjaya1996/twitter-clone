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

export const getLoggedInUserInfo = () => API.get('/api/users/myprofile');

export const getUserInfoById = (id: string) =>
  API.get(`/api/users/profile/${id}`);

export const followUser = (id: string) => API.put(`/api/users/${id}/follow`);

export const getUserFollowers = (id: string) =>
  API.get(`/api/users/${id}/followers`);

export const getUserFollowng = (id: string) =>
  API.get(`/api/users/${id}/following`);

// POSTS
export const fetchPosts = () => API.get('/api/posts?followingOnly=true');

export const fetchUserPosts = (userId?: string) =>
  API.get(`/api/posts?postedBy=${userId}`);

export const fetchUserPostReplies = (userId: string) =>
  API.get(`/api/posts?postedBy=${userId}&isReply=true`);

export const fetchPostDetails = (id: string) => API.get(`/api/posts/${id}`);

export const createPost = (data: { content: string; replyTo?: string }) =>
  API.post('/api/posts', data);

export const likePost = (id: string) => API.put(`/api/posts/${id}/like`);

export const retweetPost = (id: string) => API.post(`/api/posts/${id}/retweet`);

export const deletePost = (id: string) => API.delete(`/api/posts/${id}`);

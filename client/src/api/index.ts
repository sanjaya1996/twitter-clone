// ------------------------------ IMPORTS ------------------------------
import axios, { AxiosRequestConfig } from 'axios';
import {
  RegisterUserDataType,
  UserType,
} from '../store/actions/user/userActionTypes';
import { PostInterface } from '../store/actions/post/postActionTypes';

// ------------------------------ AXIOS CONFIGURATION ---------------------

export const BASE_URL = 'http://localhost:5000';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  const userInfoJSON = localStorage.getItem('userInfo');
  if (userInfoJSON) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfoJSON).token}`;
  }
  return req;
});

const formDataConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// -------------------------------------- ALL API CALLS -----------------------

// USERS

export const getLoggedInUserInfo = () => API.get('/api/users/myprofile');

export const getUserInfoById = (id: string) =>
  API.get(`/api/users/profile/${id}`);

export const followUser = (id: string) => API.put(`/api/users/${id}/follow`);

export const getUserFollowers = (id: string) =>
  API.get(`/api/users/${id}/followers`);

export const getUserFollowng = (id: string) =>
  API.get(`/api/users/${id}/following`);

export const searchUsers = (keywords: string) =>
  API.get(`api/users?search=${keywords}`);

export const registerUser = (userInfo: RegisterUserDataType) =>
  API.post('/api/users', userInfo);

export const loginUser = (loginDetails: { email: string; password: string }) =>
  API.post('/api/users/login', loginDetails);

// POSTS
export const fetchPosts = () => API.get('/api/posts?followingOnly=true');

export const fetchUserPosts = (userId?: string) =>
  API.get(`/api/posts?postedBy=${userId}`);

export const fetchUserPostReplies = (userId: string) =>
  API.get(`/api/posts?postedBy=${userId}&isReply=true`);

export const fetchPostDetails = (id: string) => API.get(`/api/posts/${id}`);

export const searchPosts = (keywords: string) =>
  API.get(`api/posts?search=${keywords}`);

export const createPost = (data: { content: string; replyTo?: string }) =>
  API.post('/api/posts', data);

export const retweetPost = (id: string) =>
  API.post<PostInterface>(`/api/posts/${id}/retweet`);

export const likePost = (id: string) => API.put(`/api/posts/${id}/like`);

export const updatePost = (id: string, body: Partial<PostInterface>) =>
  API.put(`/api/posts/${id}`, body);

export const deletePost = (id: string) => API.delete(`/api/posts/${id}`);

//CHATS
export const fetchChats = () => API.get('/api/chats');

export const fetchUnreadChats = () => API.get('/api/chats?unreadOnly=true');

export const fetchChatDetails = (id: string) => API.get(`/api/chats/${id}`);

export const createChat = (users: UserType[]) =>
  API.post('/api/chats', { users });

export const updateChat = (id: string, name: string) =>
  API.put(`/api/chats/${id}`, { chatName: name });

// MESSAGES
export const sendMessage = (content: string, chatId: string) =>
  API.post('/api/messages', { content, chatId });

export const getMessages = (chatId: string) =>
  API.get(`/api/chats/${chatId}/messages`); // Get messages from Chats by chatId

export const markAllMessagesAsRead = (chatId: string) =>
  API.put(`/api/chats/${chatId}/messages/markAsRead`);

// NOTIFICATIONS
export const getNotifications = () => API.get('/api/notifications');

export const getUnreadNotifications = () =>
  API.get('/api/notifications?unreadOnly=true');

export const getLatestNotification = () => API.get('/api/notifications/latest');

export const markANotificationAsOpened = (id: string) =>
  API.put(`/api/notifications/${id}/markAsOpened`);

export const markAllNotificationsAsOpened = () =>
  API.put('/api/notifications/markAsOpened');

// UPLOADS
export const uploadProfilePicture = (formData: FormData) =>
  API.post('/api/uploads/profilePicture', formData, formDataConfig);

export const uploadCoverPhoto = (formData: FormData) =>
  API.post('/api/uploads/coverPhoto', formData, formDataConfig);

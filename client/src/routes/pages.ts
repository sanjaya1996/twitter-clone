import React from 'react';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/login/RegisterPage';
import PostPage from '../pages/post/PostPage';
import MyProfilePage from '../pages/profile/MyProfilePage';
import OthersProfilePage from '../pages/profile/OthersProfilePage';
import FollowersFollowingPage from '../pages/profile/followers-following/FollowersFollowingPage';

interface PagesInterface {
  exact: boolean;
  path: string;
  component: React.FC<any>;
  layout?: React.FC<any>;
  protect: boolean;
}

const pages: PagesInterface[] = [
  {
    exact: true,
    path: '/',
    component: HomePage,
    layout: MainLayout,
    protect: true,
  },
  {
    exact: true,
    path: '/post/:id',
    component: PostPage,
    layout: MainLayout,
    protect: true,
  },
  {
    exact: true,
    path: '/profile',
    component: MyProfilePage,
    layout: MainLayout,
    protect: true,
  },
  {
    exact: true,
    path: '/profile/:id',
    component: OthersProfilePage,
    layout: MainLayout,
    protect: true,
  },
  {
    exact: true,
    path: '/profile/:id/:tabname',
    component: FollowersFollowingPage,
    layout: MainLayout,
    protect: true,
  },
  { exact: true, path: '/register', component: RegisterPage, protect: false },
  { exact: true, path: '/login', component: LoginPage, protect: false },
];

export default pages;

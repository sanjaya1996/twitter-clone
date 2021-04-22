import React from 'react';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/login/RegisterPage';
import PostPage from '../pages/post/PostPage';
import MyProfilePage from '../pages/profile/MyProfilePage';
import OthersProfilePage from '../pages/profile/OthersProfilePage';
import FollowersFollowingPage from '../pages/profile/followers-following/FollowersFollowingPage';
import SearchPage from '../pages/search/SearchPage';

interface PagesInterface {
  exact: boolean;
  path: string;
  component: React.FC<any>;
  layout?: React.FC<any>;
  protect: boolean;
  pageTitle?: string;
}

const pages: PagesInterface[] = [
  {
    exact: true,
    path: '/',
    component: HomePage,
    layout: MainLayout,
    protect: true,
    pageTitle: 'Home',
  },
  {
    exact: true,
    path: '/post/:id',
    component: PostPage,
    layout: MainLayout,
    protect: true,
    pageTitle: 'View Post',
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
  {
    exact: true,
    path: '/search/:tabname',
    component: SearchPage,
    layout: MainLayout,
    protect: true,
    pageTitle: 'Search',
  },
  {
    exact: true,
    path: '/register',
    component: RegisterPage,
    protect: false,
    pageTitle: 'Register',
  },
  {
    exact: true,
    path: '/login',
    component: LoginPage,
    protect: false,
    pageTitle: 'Login',
  },
];

export default pages;

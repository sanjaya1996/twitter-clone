import React from 'react';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/login/RegisterPage';
import PostPage from '../pages/post/PostPage';

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
  { exact: true, path: '/register', component: RegisterPage, protect: false },
  { exact: true, path: '/login', component: LoginPage, protect: false },
];

export default pages;

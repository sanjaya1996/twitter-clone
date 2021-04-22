import React from 'react';
import NavBar from '../components/navBar/NavBar';
import TitleBar from '../components/titleBar/TitleBar';
import './mainLayout.scss';

interface MainLayoutProps {
  children: React.FC;
  pageTitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className='wrapper'>
      <div className='row'>
        <nav className='col-2'>
          <NavBar />
        </nav>
        <div className='mainSectionContainer col-10 col-md-8'>
          {pageTitle && <TitleBar title={pageTitle} />}
          {children}
        </div>
        <div className='d-none d-md-block col-md-2'></div>
      </div>
    </div>
  );
};

export default MainLayout;

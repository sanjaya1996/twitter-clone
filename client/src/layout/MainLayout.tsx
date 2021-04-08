import React from 'react';
import NavBar from '../components/navBar/NavBar';
import './mainLayout.scss';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className='wrapper'>
      <div className='row'>
        <nav className='col-2'>
          <NavBar />
        </nav>
        <div className='mainSectionContainer col-10 col-md-8'>{children}</div>
        <div className='d-none d-md-block col-md-2'>
          <span>Third Column</span>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

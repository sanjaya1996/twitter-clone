import React from 'react';

import './loadingSpinner.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className='loadingSpinnerContainer'>
      <img src='/images/loadingSpinner.gif' alt='Loading...' />
    </div>
  );
};

export default LoadingSpinner;

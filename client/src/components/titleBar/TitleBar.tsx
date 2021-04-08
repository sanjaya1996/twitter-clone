import React from 'react';

import './titleBar.scss';

type PropsType = {
  title: string;
};

const TitleBar: React.FC<PropsType> = ({ title }: PropsType) => {
  return (
    <div className='titleContainer'>
      <h1>{title}</h1>
    </div>
  );
};

export default TitleBar;

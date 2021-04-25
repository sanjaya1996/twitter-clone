import React from 'react';
import { Link } from 'react-router-dom';

import './titleBar.scss';

type PropsType = {
  title: string;
  headerBtnIcon?: string;
  link?: string;
};

const TitleBar: React.FC<PropsType> = ({
  title,
  headerBtnIcon,
  link,
}: PropsType) => {
  return (
    <div className='titleContainer'>
      <h1>{title}</h1>
      {headerBtnIcon &&
        (link ? (
          <Link to={link}>
            <i className={headerBtnIcon}></i>
          </Link>
        ) : (
          <div className='headerButton'>
            <i className={headerBtnIcon}></i>
          </div>
        ))}
    </div>
  );
};

export default TitleBar;

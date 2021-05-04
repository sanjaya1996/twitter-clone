import React from 'react';
import { Link } from 'react-router-dom';

import './titleBar.scss';

type PropsType = {
  title: string;
  headerBtnIcon?: string;
  link?: string;
  onBtnClick?: () => void;
};

const TitleBar: React.FC<PropsType> = ({
  title,
  headerBtnIcon,
  link,
  onBtnClick,
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
          <button className='headerButton' onClick={onBtnClick}>
            <i className={headerBtnIcon}></i>
          </button>
        ))}
    </div>
  );
};

export default TitleBar;

import React from 'react';
import { Link } from 'react-router-dom';

import './resultList.scss';

interface ResultListProps {
  imageUrls?: string[];
  linkTo?: string;
  header?: string;
  subText?: string;
  listText?: string;
  containerClassName?: 'active' | '';
  imageClassName?: string;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ResultListItem: React.FC<ResultListProps> = ({
  imageUrls,
  linkTo,
  header,
  subText,
  listText,
  containerClassName,
  imageClassName,
  onItemClick,
}) => {
  return (
    <Link
      to={linkTo || '#'}
      className={`resultListItem ${containerClassName || ''}`}
      onClick={onItemClick}
    >
      {imageUrls && (
        <div className={`resultsImageContainer ${imageClassName || ''}`}>
          {imageUrls.map((src, i) => (
            <img key={i} src={src} alt='Chat Pic' />
          ))}
        </div>
      )}

      <div className='resultsDetailsContainer ellipsis'>
        {header && <span className='heading ellipsis'>{header}</span>}
        {listText && <span className='ellipsis'>{listText}</span>}
        {subText && <span className='subText ellipsis'>{subText}</span>}
      </div>
    </Link>
  );
};

export default ResultListItem;

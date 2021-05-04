import React from 'react';
import { Link } from 'react-router-dom';

import './resultList.scss';

interface ResultListProps {
  imageUrls?: string[];
  imageClassName?: string;
  linkTo?: string;
  header?: string;
  subText?: string;
  listText?: string;
}

const ResultListItem: React.FC<ResultListProps> = ({
  imageUrls,
  imageClassName,
  linkTo,
  header,
  subText,
  listText,
}) => {
  return (
    <Link to={linkTo || '#'} className='resultListItem'>
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

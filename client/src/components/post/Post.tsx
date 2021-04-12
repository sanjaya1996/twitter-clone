import React from 'react';
import { Link } from 'react-router-dom';
import { PostInterface } from '../../store/actions/post/postActionTypes';
import { timeDifference } from '../../utils/timeDifference';
import ProfileImage from '../image/ProfileImage';

import './post.scss';

type PostProps = { postData: PostInterface };

const Post: React.FC<PostProps> = ({ postData }) => {
  const { postedBy, content, createdAt } = postData;
  const displayName = postedBy.firstName + ' ' + postedBy.lastName;
  const timeStamp = timeDifference(new Date(), new Date(createdAt));

  return (
    <div className='post'>
      <div className='mainContentContainer'>
        <ProfileImage uri={postedBy.profilePic} />
        <div className='postContentContainer'>
          <div className='header'>
            <Link to='/profile' className='displayName'>
              {displayName}
            </Link>
            <span className='username'> @{postedBy.userName}</span>
            <span className='date'> {timeStamp}</span>
          </div>
          <div className='postBody'>
            <span>{content}</span>
          </div>
          <div className='postFooter'>
            <div className='postButtonContainer'>
              <button>
                <i className='far fa-comment'></i>
              </button>
            </div>
            <div className='postButtonContainer'>
              <button>
                <i className='fas fa-retweet'></i>
              </button>
            </div>
            <div className='postButtonContainer'>
              <button>
                <i className='far fa-heart'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

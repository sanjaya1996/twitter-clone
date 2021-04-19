import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { PostInterface } from '../../store/actions/post/postActionTypes';
import { timeDifference } from '../../utils/timeDifference';
import ProfileImage from '../image/ProfileImage';
import * as postActions from '../../store/actions/post/postActions';

import PostReplyModal from '../modals/PostReplyModal';
import PostDelteModal from '../modals/PostDeleteModal';

import './post.scss';

interface PostProps {
  post: PostInterface;
  userId: string;
  largeFont?: boolean;
}

const Post: React.FC<PostProps> = ({ post, userId, largeFont }) => {
  const isRetweet = post.retweetData;
  const retweetedBy = isRetweet ? post.postedBy.userName : null;
  const isReply = post.replyTo;
  const replyingTo = isReply ? post.replyTo.postedBy.userName : null;
  const retweetId = isRetweet ? post._id : null; //Track this ID to update right Component in UI otherwise the component with original tweet will be updated incase of liking and tweeting.
  const originalPost = post.retweetData || post;
  const {
    postedBy,
    content,
    createdAt,
    _id: postId,
    likes,
    retweetUsers,
  } = originalPost;

  const isLoggedInUserPost = userId === postedBy._id;

  const displayName = postedBy.firstName + ' ' + postedBy.lastName;
  const timeStamp = timeDifference(new Date(), new Date(createdAt));

  const likeButtonActiveClass = likes?.includes(userId) ? 'active-red' : '';
  const retweetButtonActiveClass = retweetUsers.includes(userId)
    ? 'active-green'
    : '';
  const largeFontClass = largeFont ? 'largeFont' : '';

  const dispatch = useDispatch();
  const history = useHistory();

  const numOfLikes = likes?.length || '';
  const numOfRetweets = retweetUsers.length || '';

  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const postLikeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(postActions.likePost(postId, retweetId));
  };

  const postRetweetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(postActions.retweetPost(postId, retweetId));
  };

  const postClickHandler = () => {
    history.push(`/post/${post._id}`);
  };

  return (
    <div className={`post ${largeFontClass}`} onClick={postClickHandler}>
      {retweetedBy && (
        <div className='postActionContainer'>
          <span>
            <i className='fas fa-retweet '></i> Retweeted by @
            <Link to='#'>{retweetedBy}</Link>
          </span>
        </div>
      )}
      <div className='mainContentContainer'>
        <ProfileImage uri={postedBy.profilePic} />
        <div className='postContentContainer'>
          <div className='header'>
            <Link
              to={`/profile/${postedBy.userName}`}
              className='displayName'
              onClick={stopPropagation}
            >
              {displayName}
            </Link>
            <span className='username'> @{postedBy.userName}</span>
            <span className='date'> {timeStamp}</span>
            {isLoggedInUserPost && <PostDelteModal postId={postId} />}
          </div>
          {isReply && (
            <div className='replyFlag'>
              Replying to <Link to='#'>@{replyingTo}</Link>{' '}
            </div>
          )}
          <div className='postBody'>
            <span>{content}</span>
          </div>
          <div className='postFooter'>
            <div className='postButtonContainer'>
              <PostReplyModal postId={postId} />
            </div>
            <div className='postButtonContainer'>
              <button className={`${retweetButtonActiveClass}`}>
                <i
                  onClick={postRetweetHandler}
                  className='fas fa-retweet green'
                ></i>
                <span>{numOfRetweets}</span>
              </button>
            </div>
            <div className='postButtonContainer'>
              <button className={`likeButton ${likeButtonActiveClass}`}>
                <i onClick={postLikeHandler} className='far fa-heart red'></i>
                <span>{numOfLikes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

import React from 'react';

import { PostInterface } from '../../store/actions/post/postActionTypes';
import FallBackMessage from '../fallbackMessage/FallbackMessage';
import LoadingSpinner from '../loadingSpinner/LoadSpinner';
import Post from './Post';

interface postListProps {
  posts: PostInterface[];
  userId: string;
  loading?: boolean;
}
const PostList: React.FC<postListProps> = ({ posts, userId, loading }) => {
  return (
    <div className='resultsContainer'>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <FallBackMessage />
      ) : (
        posts.map((post) => <Post key={post._id} post={post} userId={userId} />)
      )}
    </div>
  );
};

export default PostList;

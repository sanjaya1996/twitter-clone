import React from 'react';

import { PostInterface } from '../../store/actions/post/postActionTypes';
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
        <p>No results found</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} userId={userId} />)
      )}
    </div>
  );
};

export default PostList;

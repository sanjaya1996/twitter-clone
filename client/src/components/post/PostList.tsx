import React from 'react';

import { PostInterface } from '../../store/actions/post/postActionTypes';
import Post from './Post';

interface postListProps {
  posts: PostInterface[];
  userId: string;
}
const PostList: React.FC<postListProps> = ({ posts, userId }) => {
  return (
    <>
      {posts.length === 0 ? (
        <p>No results found</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} userId={userId} />)
      )}
    </>
  );
};

export default PostList;

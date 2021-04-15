import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import TitleBar from '../../components/titleBar/TitleBar';
import { RootStore } from '../../store/store';
import * as postActions from '../../store/actions/post/postActions';
import Post from '../../components/post/Post';

interface RouteParams {
  id: string;
}

const ViewPostPage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const postId = match.params.id;

  const dispatch = useDispatch();

  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  const postDetalsState = useSelector((state: RootStore) => state.postDetails);
  const { loading, error, post } = postDetalsState;

  useEffect(() => {
    dispatch(postActions.getPostDetails(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <h1>Loading Post....</h1>;
  }

  if (error) {
    return <h1>An Error Occured: ${error}</h1>;
  }

  return (
    <div>
      <TitleBar title='View Post' />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !post ? (
        <p>No Post to Load</p>
      ) : (
        <>
          {post.replyTo && post.replyTo._id && (
            // Replying To Post
            <Post
              key={post.replyTo._id}
              post={post.replyTo}
              userId={user!._id}
            />
          )}
          {/* User Clicked Post */}
          <Post
            key={post.postData._id}
            post={post.postData}
            userId={user!._id}
          />
          {/* Replies of User Clicked Post*/}
          {post.replies.length > 0 &&
            post.replies.map((post) => (
              <Post key={post._id} post={post} userId={user!._id} />
            ))}
        </>
      )}
    </div>
  );
};

export default ViewPostPage;

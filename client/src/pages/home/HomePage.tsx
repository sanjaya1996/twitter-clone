import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PostForm from '../../components/postForm/PostForm';
import TitleBar from '../../components/titleBar/TitleBar';

import { RootStore } from '../../store/store';
import * as postActions from '../../store/actions/post/postActions';
import Post from '../../components/post/Post';

const HomePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const loggedInUserState = useSelector(
    (state: RootStore) => state.loggedInUserInfo
  );
  const { user } = loggedInUserState;

  const postListState = useSelector((state: RootStore) => state.postList);
  const { posts, loading, error } = postListState;

  const postCreateState = useSelector((state: RootStore) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = postCreateState;

  const postDeleteState = useSelector((state: RootStore) => state.postDelete);
  const { success: successDelete } = postDeleteState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.listPosts());
  }, [dispatch, successDelete]);

  if (!user) {
    return <h1>Authentication Failed, Please Try Again</h1>;
  }

  return (
    <div>
      <TitleBar title='Home' />
      <PostForm
        imageUrl={user.profilePic}
        creating={loadingCreate}
        error={errorCreate}
        createSuccess={success}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : posts.length === 0 ? (
        <p>No Post to Load</p>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post._id} post={post} userId={user._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;

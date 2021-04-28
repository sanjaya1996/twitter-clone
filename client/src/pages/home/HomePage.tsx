import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PostForm from '../../components/postForm/PostForm';

import { RootStore } from '../../store/store';
import * as postActions from '../../store/actions/post/postActions';
import PostList from '../../components/post/PostList';

const HomePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const state = useSelector((state: RootStore) => state);

  const loggedInUserState = state.loggedInUserInfo;
  const { user } = loggedInUserState;

  const postListState = state.postList;
  const { posts, loading, error } = postListState;

  const postCreateState = state.postCreate;
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = postCreateState;

  const postDeleteState = state.postDelete;
  const { success: successDelete } = postDeleteState;

  const postUpdateState = state.postUpdate;
  const { success: successUpdate } = postUpdateState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.listPosts());
  }, [dispatch, successDelete, successUpdate]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <PostForm
        imageUrl={user.profilePic}
        creating={loadingCreate}
        error={errorCreate}
        createSuccess={success}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <PostList posts={posts} userId={user._id} loading={loading} />
      )}
    </>
  );
};

export default HomePage;

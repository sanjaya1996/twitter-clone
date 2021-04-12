import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PostForm from '../../components/postForm/PostForm';
import TitleBar from '../../components/titleBar/TitleBar';

import { RootStore } from '../../store/store';
import * as postActions from '../../store/actions/post/postActions';
import Post from '../../components/post/Post';

const checkUserHasAlreadyLiked = (userId: string, likesArray: string[]) => {
  return likesArray.includes(userId);
};

const HomePage: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const userLoginState = useSelector((state: RootStore) => state.userLogin);
  const { user } = userLoginState;

  const postListState = useSelector((state: RootStore) => state.postList);
  const { posts, loading, error } = postListState;

  const postCreateState = useSelector((state: RootStore) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = postCreateState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } else {
      dispatch(postActions.listPosts());
    }
  }, [user, history, dispatch, success]);

  return (
    <div>
      <TitleBar title='Home' />
      <PostForm
        imageUrl={user!.profilePic}
        creating={loadingCreate}
        error={errorCreate}
        createSuccess={success}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {posts.map((post) => (
            <Post
              key={post._id}
              postData={post}
              currentUserHasLiked={checkUserHasAlreadyLiked(
                user?._id!,
                post.likes!
              )}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;

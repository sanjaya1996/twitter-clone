import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootStore } from '../../store/store';
import * as postActions from '../../store/actions/post/postActions';
import Post from '../../components/post/Post';
import LoadingSpinner from '../../components/loadingSpinner/LoadSpinner';
import Meta from '../../components/meta/Meta';

interface RouteParams {
  id: string;
}

const ViewPostPage: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const postId = match.params.id;

  const dispatch = useDispatch();

  const userAuthState = useSelector((state: RootStore) => state.userAuth);
  const { user } = userAuthState;

  const postDetalsState = useSelector((state: RootStore) => state.postDetails);
  const { loading, error, post } = postDetalsState;

  useEffect(() => {
    dispatch(postActions.getPostDetails(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>An Error Occured: ${error}</p>;
  }

  if (!post) {
    return <p>No Post to Load</p>;
  } else {
    const clickedPost = post.postData;
    const originalPost =
      clickedPost.replyTo || clickedPost.retweetData || clickedPost;
    const documentTitle =
      originalPost.postedBy.firstName +
      ' ' +
      originalPost.postedBy.lastName +
      ' on TweetHouse: ' +
      originalPost.content;
    return (
      <div>
        <Meta title={documentTitle} />
        {post.replyTo &&
          (post.replyTo._id ? (
            // Replying To Post
            <Post
              key={post.replyTo._id}
              post={post.replyTo}
              userId={user!._id}
            />
          ) : (
            <p>Original Post Not Found</p>
          ))}
        {/* User Clicked Post */}
        <Post
          key={post.postData._id}
          post={post.postData}
          userId={user!._id}
          largeFont={true}
        />
        {/* Replies of User Clicked Post*/}
        {post.replies.length > 0 &&
          post.replies.map((post) => (
            <Post key={post._id} post={post} userId={user!._id} />
          ))}
      </div>
    );
  }
};

export default ViewPostPage;

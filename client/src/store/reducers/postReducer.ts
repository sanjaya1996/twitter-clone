import {
  PostCreateDispatchTypes,
  PostDeleteDispatchTypes,
  PostDetailsDispatchTypes,
  PostInterface,
  PostLikeDispatchTypes,
  PostListDispatchTypes,
  POST_CREATE_FAIL,
  POST_CREATE_LOADING,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_LOADING,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_LOADING,
  POST_DETAILS_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_LOADING,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_LOADING,
  POST_LIST_SUCCESS,
  POST_LIST_UPDATE_ONLIKE,
  POST_RETWEET,
} from '../actions/post/postActionTypes';

// ---TYPES AND INTERFACES
interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface PostListDefaultStateI extends DefaultStateI {
  posts: PostInterface[];
}

interface PostDetailsDefaultStateI extends DefaultStateI {
  post?: {
    postData: PostInterface;
    replyTo?: PostInterface;
    replies: PostInterface[];
  };
}

interface PostCreateDefaultStateI extends DefaultStateI {
  post?: PostInterface;
  success?: boolean;
}

interface PostDeleteDefaultStateI extends DefaultStateI {
  post?: PostInterface;
  success?: boolean;
  message?: string;
}

interface PostLikeDefaultStateI extends DefaultStateI {
  post?: PostInterface;
  success?: boolean;
}

const postListDefaultState: PostListDefaultStateI = {
  posts: [],
};

// ------REDUCERS
export const postListReducer = (
  state: PostListDefaultStateI = postListDefaultState,
  action: PostListDispatchTypes
): PostListDefaultStateI => {
  switch (action.type) {
    case POST_LIST_LOADING:
      return { ...state, loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_UPDATE_ONLIKE:
      return updatePostField(
        state.posts,
        action.payload.data,
        action.payload.retweetId,
        'likes'
      );
    case POST_RETWEET:
      return updatePostField(
        state.posts,
        action.payload.data,
        action.payload.retweetId,
        'retweetUsers'
      );
    default:
      return state;
  }
};

export const postDetailsReducer = (
  state: PostDetailsDefaultStateI = {},
  action: PostDetailsDispatchTypes
): PostDetailsDefaultStateI => {
  switch (action.type) {
    case POST_DETAILS_LOADING:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (
  state: PostCreateDefaultStateI = {},
  action: PostCreateDispatchTypes
): PostCreateDefaultStateI => {
  switch (action.type) {
    case POST_CREATE_LOADING:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (
  state: PostDeleteDefaultStateI = {},
  action: PostDeleteDispatchTypes
): PostDeleteDefaultStateI => {
  switch (action.type) {
    case POST_DELETE_LOADING:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postLikeReducer = (
  state: PostLikeDefaultStateI = {},
  action: PostLikeDispatchTypes
): PostLikeDefaultStateI => {
  switch (action.type) {
    case POST_LIKE_LOADING:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ------UTILS FUNCTIONS

function updatePostField<T extends keyof PostInterface>(
  postsArray: PostInterface[],
  newPost: PostInterface,
  retweetId: string | null,
  field: T
) {
  const postToBeUpdated_id = retweetId || newPost._id;
  const foundIndex = postsArray.findIndex((p) => p._id === postToBeUpdated_id);
  const updatedPosts = [...postsArray];

  if (retweetId) {
    updatedPosts[foundIndex].retweetData[field] = newPost[field];
  } else {
    updatedPosts[foundIndex][field] = newPost[field];
  }

  return { posts: updatedPosts };
}

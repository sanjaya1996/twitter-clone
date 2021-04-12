import {
  PostCreateDispatchTypes,
  PostInterface,
  PostLikeDispatchTypes,
  PostListDispatchTypes,
  POST_CREATE_FAIL,
  POST_CREATE_LOADING,
  POST_CREATE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_LOADING,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_LOADING,
  POST_LIST_SUCCESS,
  POST_LIST_UPDATE_ONLIKE,
} from '../actions/post/postActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
}

interface PostListDefaultStateI extends DefaultStateI {
  posts: PostInterface[];
}

interface PostCreateDefaultStateI extends DefaultStateI {
  post?: PostInterface;
  success?: boolean;
}

interface PostLikeDefaultStateI extends DefaultStateI {
  post?: PostInterface;
  success?: boolean;
}

const postListDefaultState: PostListDefaultStateI = {
  posts: [],
};

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
      const updatedPosts = state.posts.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
      return { posts: updatedPosts };
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

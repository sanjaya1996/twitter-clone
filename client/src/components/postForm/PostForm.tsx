import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/post/postActions';
import ProfileImage from '../image/ProfileImage';

import './postForm.scss';

type PropsType = {
  imageUrl: string;
  creating: boolean | undefined;
  createSuccess: boolean | undefined;
  error: string | undefined;
};

const PostForm: React.FC<PropsType> = ({
  imageUrl,
  creating,
  error,
  createSuccess,
}) => {
  const [post, setPost] = useState('');

  const dispatch = useDispatch();

  const submitPostHandler = () => {
    if (post.trim().length < 1) {
      alert('Please enter some text');
      return;
    }
    dispatch(postActions.createPost({ content: post }));
  };

  useEffect(() => {
    if (createSuccess) {
      setPost('');
    }
  }, [createSuccess]);

  return (
    <div className='postFormContainer'>
      <ProfileImage uri={imageUrl} />
      <div className='textAreaContainer'>
        <textarea
          id='postTextarea'
          placeholder="What's happening?"
          value={post}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPost(e.target.value)
          }
        />
        {error && <p>{error}</p>}
        <div className='buttonsContainer'>
          <button
            id='submitPostButton'
            disabled={post.trim().length < 1}
            onClick={submitPostHandler}
          >
            {creating ? '....' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

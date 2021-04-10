import React, { useState } from 'react';

import './postForm.scss';

type PropType = {
  imageUrl?: string;
};

const PostForm: React.FC<PropType> = ({ imageUrl }) => {
  const [post, setPost] = useState('');

  const submitPostHandler = () => {
    if (post.trim().length < 1) {
      alert('Please enter some text');
      return;
    }

    console.log(post);
  };

  return (
    <div className='postFormContainer'>
      <div className='userImageContainer'>
        <img src={imageUrl} alt="User's profile" />
      </div>
      <div className='textAreaContainer'>
        <textarea
          id='postTextarea'
          placeholder="What's happening?"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPost(e.target.value)
          }
        />
        <div className='buttonsContainer'>
          <button
            id='submitPostButton'
            disabled={post.trim().length < 1}
            onClick={submitPostHandler}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

import React, { useState } from 'react';

import './postForm.scss';

type PropType = {
  imageUrl?: string;
};

const PostForm: React.FC<PropType> = ({ imageUrl }) => {
  const [post, setPost] = useState('');

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
          <button id='submitPostButton' disabled={post.trim().length < 1}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

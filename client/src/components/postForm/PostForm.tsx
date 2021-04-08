import React from 'react';

type PropType = {
  imageUrl?: string;
};

const PostForm: React.FC<PropType> = ({ imageUrl }) => {
  return (
    <div className='postFormContainer'>
      <div className='userImageContainer'>
        <img src={imageUrl} alt="User's profile" />
      </div>
      <div className='textAreaContainer'>
        <textarea id='postTextarea' placeholder="What's happening?" />
        <div className='buttonsContainer'>
          <button id='submitPostButton' disabled>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

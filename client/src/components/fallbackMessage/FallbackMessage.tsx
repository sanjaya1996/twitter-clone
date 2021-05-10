import React from 'react';

import './fallbackMessage.scss';

interface FallBackMessageProps {
  type?: 'error' | 'success' | 'no-content';
  message?: string;
}
const FallBackMessage: React.FC<FallBackMessageProps> = ({
  message = 'Nothing to show',
}) => {
  return (
    <div className='fallbackMessage'>
      <span className='fallbackText'>{message}</span>
    </div>
  );
};

export default FallBackMessage;

import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chatContext';

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const date = message.date.toDate();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  console.log('currentuser.id', currentUser.uid);
  console.log('sender.id', message.senderId);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>
          {date.getHours() % 12 || 12}:{date.getMinutes()}
          {date.getHours() >= 12 ? ' PM' : ' AM'}
        </span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && (
          <img
            src={message.img}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

// export default Message;

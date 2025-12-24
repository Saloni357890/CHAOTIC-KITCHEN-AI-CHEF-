
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isChef = message.sender === 'chef';

  return (
    <div className={`flex w-full mb-4 ${isChef ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-md transform transition-all hover:scale-[1.02] ${
          isChef
            ? 'bg-white border-4 border-orange-500 rounded-tl-none text-gray-800'
            : 'bg-orange-500 text-white rounded-tr-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {isChef ? (
            <span className="text-xl">👩‍🍳</span>
          ) : (
            <span className="text-xl">👤</span>
          )}
          <span className={`text-xs font-bold uppercase tracking-wider ${isChef ? 'text-orange-600' : 'text-orange-100'}`}>
            {isChef ? 'Chaotic Chef' : 'Hungry Human'}
          </span>
        </div>
        <p className="text-lg font-semibold leading-tight">
          {message.text}
        </p>
        <span className={`block text-[10px] mt-2 opacity-60 ${isChef ? 'text-gray-500' : 'text-white'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;

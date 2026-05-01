'use client';

import { Message } from '../services/chatService';

interface Props {
  message: Message;
  isOwn: boolean;
}

export default function ChatBubble({ message, isOwn }: Props) {
  const date = new Date(message.createdAt);
  const formatted = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const decoded = message.message
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  if (isOwn) {
    return (
      <div className="bubble-own">
        <div className="bubble-own-inner">
          <p className="bubble-message">{decoded}</p>
          <p className="bubble-time-right">{formatted}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bubble-other">
      <div className="bubble-other-inner">
        <p className="bubble-author">{message.author}</p>
        <p className="bubble-message">{decoded}</p>
        <p className="bubble-time">{formatted}</p>
      </div>
    </div>
  );
}
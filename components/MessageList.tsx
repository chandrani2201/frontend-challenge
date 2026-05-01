'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Message } from '../services/chatService';
import ChatBubble from './ChatBubble';

interface Props {
  messages: Message[];
  currentUser: string;
}

export default function MessageList({ messages, currentUser }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [userScrolling, setUserScrolling] = useState(false);

  const sortedMessages = useMemo(() => {
    return messages.map((msg) => ({
      ...msg,
      message: msg.message
        .replace(/&#39;/g, "'"),
    }));
  }, [messages]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    setUserScrolling(!isAtBottom);
  };

  useEffect(() => {
    if (!userScrolling) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, userScrolling]);

  
  return (
    <div ref={containerRef} onScroll={handleScroll} className="chat-messages">
      {sortedMessages.map((msg) => (
        <ChatBubble
          key={msg._id}
          message={msg}
          isOwn={msg.author === currentUser}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
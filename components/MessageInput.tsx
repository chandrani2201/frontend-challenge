'use client';

import { useState } from 'react';

interface Props {
  onSend: (message: string) => void;
  isSending: boolean;
}

export default function MessageInput({ onSend, isSending }: Props) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-bar">
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="chat-message-input"
        aria-label="Message"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={isSending}
        className="chat-send-button"
        aria-label="Send message"
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
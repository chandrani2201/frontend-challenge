'use client';

import './chat.css';
import { useEffect, useState } from 'react';
import { Message, getMessages, sendMessage } from '../services/chatService';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { POLL_INTERVAL, CURRENT_USER } from '../services/constants';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
      setError('');
    } catch (err) {
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (message: string) => {
    setIsSending(true);
    try {
      await sendMessage(message, CURRENT_USER);
      await fetchMessages();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-container">
      {loading ? (
        <div className="chat-loading">
          <p>Loading messages...</p>
        </div>
      ) : error ? (
        <div className="chat-error">
          <p>{error}</p>
          <button onClick={fetchMessages} className="chat-retry-button">
            Retry
          </button>
        </div>
      ) : (
        <MessageList messages={messages} currentUser={CURRENT_USER} />
      )}
      <MessageInput onSend={handleSend} isSending={isSending} />
    </div>
  );
}
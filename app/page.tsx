'use client';

import { useEffect, useState } from 'react';
import { Message, getMessages, sendMessage } from '../services/chatService';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { POLL_INTERVAL, CURRENT_USER } from '../services/constants';
import './chat.css';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const fetchMessages = async () => {
  try {
    const data = await getMessages();
    setMessages(data); // remove the reverse!
  } catch (error) {
    console.error('Failed to fetch messages:', error);
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
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} currentUser={CURRENT_USER} />
      <MessageInput onSend={handleSend} isSending={isSending} />
    </div>
  );
}
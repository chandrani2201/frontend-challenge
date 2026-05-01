import { API_URL, API_TOKEN, DEFAULT_LIMIT } from './constants';

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

export interface Message {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
}

export async function getMessages(after?: string, limit = DEFAULT_LIMIT): Promise<Message[]> {
  const params = new URLSearchParams();
  if (after) params.append('after', after);
  params.append('limit', String(limit));

  const res = await fetch(`${API_URL}/messages?${params}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function sendMessage(message: string, author: string): Promise<Message> {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, author }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}
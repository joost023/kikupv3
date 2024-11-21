import { checkRateLimit } from './rateLimiter';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export function saveContactMessage(message: Omit<ContactMessage, 'date'>): void {
  try {
    // Check rate limit using email as identifier
    if (!checkRateLimit(message.email)) {
      throw new Error('Too many message attempts. Please try again later.');
    }

    // Get existing messages
    const existingMessages = getContactMessages();
    
    // Add new message
    const newMessage: ContactMessage = {
      ...message,
      date: new Date().toISOString()
    };

    const updatedMessages = [...existingMessages, newMessage];
    
    // Save to localStorage
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
  } catch (error) {
    throw error;
  }
}

export function deleteContactMessage(email: string, date: string): void {
  const messages = getContactMessages();
  const updatedMessages = messages.filter(msg => 
    !(msg.email === email && msg.date === date)
  );
  localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
}

export function getContactMessages(): ContactMessage[] {
  try {
    const messages = localStorage.getItem('contact_messages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Error loading contact messages:', error);
    return [];
  }
}
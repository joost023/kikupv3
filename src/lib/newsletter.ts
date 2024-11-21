import { checkRateLimit } from './rateLimiter';

interface NewsletterSubscription {
  email: string;
  date: string;
  source: 'homepage' | 'shop';
}

export function saveNewsletterSubscription(email: string, source: 'homepage' | 'shop'): void {
  try {
    // Check rate limit using IP or email as identifier
    if (!checkRateLimit(email)) {
      throw new Error('Too many subscription attempts. Please try again later.');
    }

    // Get existing subscriptions
    const existingSubscriptions = getNewsletterSubscriptions();
    
    // Check if email already exists
    if (existingSubscriptions.some(sub => sub.email === email)) {
      throw new Error('Email already subscribed');
    }

    // Add new subscription
    const newSubscription: NewsletterSubscription = {
      email,
      date: new Date().toISOString(),
      source
    };

    const updatedSubscriptions = [...existingSubscriptions, newSubscription];
    
    // Save to localStorage
    localStorage.setItem('newsletter_subscriptions', JSON.stringify(updatedSubscriptions));
  } catch (error) {
    throw error;
  }
}

export function deleteNewsletterSubscription(email: string): void {
  const subscriptions = getNewsletterSubscriptions();
  const updatedSubscriptions = subscriptions.filter(sub => sub.email !== email);
  localStorage.setItem('newsletter_subscriptions', JSON.stringify(updatedSubscriptions));
}

export function getNewsletterSubscriptions(): NewsletterSubscription[] {
  try {
    const subscriptions = localStorage.getItem('newsletter_subscriptions');
    return subscriptions ? JSON.parse(subscriptions) : [];
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    return [];
  }
}
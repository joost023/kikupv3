// Google Analytics 4 setup
export const GA_TRACKING_ID = 'G-RM4DE4QMLT';

// Log page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Game specific events
export const trackGameStart = (gameName: string) => {
  event({
    action: 'game_start',
    category: 'Games',
    label: gameName
  });
};

export const trackGameComplete = (gameName: string, score: number) => {
  event({
    action: 'game_complete',
    category: 'Games',
    label: gameName,
    value: score
  });
};

export const trackHighScore = (gameName: string, score: number) => {
  event({
    action: 'new_high_score',
    category: 'Games',
    label: gameName,
    value: score
  });
};

// Newsletter events
export const trackNewsletterSignup = (source: string) => {
  event({
    action: 'newsletter_signup',
    category: 'Engagement',
    label: source
  });
};

// Generic event tracking
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
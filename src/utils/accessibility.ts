// Accessibility utilities
export const createAriaLabel = (text: string, additional?: string): string => {
  return additional ? `${text}. ${additional}` : text;
};

export const getCapacityStatusAria = (current: number, capacity: number): string => {
  const percentage = (current / capacity) * 100;
  if (percentage < 50) return 'Low capacity';
  if (percentage < 75) return 'Moderate capacity';
  if (percentage < 90) return 'High capacity';
  return 'Very high capacity, consider visiting later';
};

export const formatPrice = (amount: number): string => {
  return `Rs. ${amount.toLocaleString()}`;
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

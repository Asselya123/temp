/**
 * Format date to display in a human-readable format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Calculate time difference between now and a target date in minutes
 * Returns positive number if target is in the future, negative if in the past
 */
export const getTimeDifferenceInMinutes = (target: Date): number => {
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.floor(diffMs / 60000); // Convert ms to minutes
};

/**
 * Format time difference to a human-readable string
 */
export const formatTimeDifference = (minutes: number): string => {
  const absMinutes = Math.abs(minutes);
  const hours = Math.floor(absMinutes / 60);
  const remainingMinutes = absMinutes % 60;
  
  let result = '';
  
  if (hours > 0) {
    result += `${hours}h `;
  }
  
  result += `${remainingMinutes}m`;
  
  if (minutes < 0) {
    return `Late by ${result}`;
  } else if (minutes > 0) {
    return `${result} left`;
  } else {
    return "Time's up";
  }
};
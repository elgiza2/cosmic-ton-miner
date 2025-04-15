
/**
 * Generates a random string of specified length
 * @param length Length of the random string
 */
export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Format number to display with 2 decimal places
 * @param num Number to format
 */
export const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

/**
 * Format TON amount with proper decimal places
 * @param amount TON amount
 */
export const formatTonAmount = (amount: number): string => {
  return amount.toFixed(3) + ' TON';
};

/**
 * Truncate an address for display
 * @param address Wallet address
 */
export const truncateAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 12) return address;
  
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

/**
 * Check if the code is running inside Telegram WebApp
 */
export const isTelegramWebApp = (): boolean => {
  return typeof window !== 'undefined' && 
         window.Telegram !== undefined && 
         window.Telegram.WebApp !== undefined;
};

/**
 * Format large numbers in a user-friendly way (e.g., 1.2K, 1.5M)
 * @param num Number to format
 */
export const formatLargeNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(1);
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  return (num / 1000000).toFixed(1) + 'M';
};

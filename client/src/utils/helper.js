/**
 * Masks the email address for privacy, showing only the first two characters of the username.
 * @param {string} email - The email address to be masked.
 * @returns {string} - The masked email address or an error message if the email is invalid.
 */
export const secretEmail = (email) => {
  if (typeof email !== 'string' || !email.trim()) {
    return 'Email not available'; // Return this if the email is not a valid string
  }

  const [username, domain] = email.split('@');
  
  if (!username || !domain || domain.indexOf('.') === -1) {
    return 'Invalid email format'; // Return this if the email format is invalid
  }

  const secretUser = username.length > 2
    ? username.substring(0, 2) + '*'.repeat(username.length - 2)
    : username; // Handle usernames with 2 or fewer characters

  return `${secretUser}@${domain}`;
};


/**
 * Estimates the reading time for a given HTML description.
 * @param {Object} desc - The description object containing HTML.
 * @returns {number} - The estimated reading time in minutes.
 */
export const readTime = (desc) => {
  const averageReading = 225; // Average reading speed in words per minute

  // Create a temporary div to extract text from HTML
  const div = document.createElement("div");
  div.innerHTML = desc.__html;

  // Get text content from the div
  const textContext = div.textContent || div.innerHTML;
  const words = textContext.trim().split(/\s+/);
  return Math.ceil(words.length / averageReading); // Round up to the nearest whole minute
};

/**
 * Formats a number into a human-readable string with units (B, M, K).
 * @param {number} num - The number to be formatted.
 * @returns {string} - The formatted number with appropriate units.
 */
export const formatNum = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Thousands
  } else {
    return num.toString(); // No formatting needed
  }
};

/**
 * Utility functions for handling image URLs
 */

/**
 * Creates a data URL for a placeholder image with text
 * @param {string} text - Text to display on the placeholder
 * @param {string} bgColor - Background color in hex format (without #)
 * @param {string} textColor - Text color in hex format (without #)
 * @returns {string} - A data URL for the placeholder image
 */
export function createPlaceholderImage(
  text,
  bgColor = '1e40af',
  textColor = 'ffffff',
) {
  // Create a simple SVG with the text
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="#${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `

  // Convert to base64 data URL
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

/**
 * Validates and fixes image URLs to ensure they're properly formatted
 * @param {string} url - The URL to validate
 * @param {string} fallbackText - Text to use in fallback image if URL is invalid
 * @returns {string} - A valid URL
 */
export function validateImageUrl(url, fallbackText) {
  // If URL is undefined or null, return a placeholder
  if (!url) {
    return createPlaceholderImage(fallbackText)
  }

  // Check for specific known malformed URLs
  if (url.includes('Bissau.svg/1280px-Flag_of_Guinea-Bissau.svg.png')) {
    console.warn('Fixed malformed Guinea-Bissau URL')
    return createPlaceholderImage('Guinea-Bissau')
  }

  // Check for any URL that doesn't start with http:// or https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.warn(`Invalid URL format: ${url}`)
    return createPlaceholderImage(fallbackText)
  }

  try {
    // Try to create a URL object to validate the URL
    const urlObj = new URL(url)

    // Check if the URL has a valid hostname
    if (!urlObj.hostname || urlObj.hostname.includes('.svg')) {
      console.warn(`Invalid hostname in URL: ${url}`)
      return createPlaceholderImage(fallbackText)
    }

    return url
  } catch (error) {
    // If URL is invalid, return a placeholder
    console.error(`Invalid URL: ${url}`, error)
    return createPlaceholderImage(fallbackText)
  }
}

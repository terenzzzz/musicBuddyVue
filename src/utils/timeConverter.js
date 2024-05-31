/**
 * Convert milliseconds to a string in the format of "minutes:seconds"
 * @param {number} milliseconds - The time in milliseconds
 * @returns {string} - The formatted time string
 */
export function millisecondsToMMss(milliseconds) {
    // Calculate total seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format seconds to be two digits (e.g., "05" instead of "5")
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Return formatted string
    return `${minutes}:${formattedSeconds}`;
}
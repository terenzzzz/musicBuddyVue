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

export function millisecondsToHHmmss(milliseconds) {
    // Calculate total seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds to be two digits (e.g., "05" instead of "5")
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Return formatted string
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}

// 输出: "Wednesday, May 1, 2024"
export function getCurrentFormattedDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    return `${dayOfWeek}, ${month} ${date}, ${year}`;
}
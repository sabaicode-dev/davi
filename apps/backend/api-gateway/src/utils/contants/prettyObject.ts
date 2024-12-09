/**
 * Converts an object into a formatted string for logging or debugging.
 *
 * @param obj - The object to be prettified.
 * @returns A string representation of the object.
 */
export function prettyObject(obj: unknown): string {
    try {
        // Use JSON.stringify to convert the object into a readable string with 2-space indentation
        return JSON.stringify(obj, null, 2);
    } catch (error) {
        // If there is an error during stringification, fallback to a simpler string
        return String(obj);
    }
}

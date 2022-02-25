export function getDateWithOffset(timestamp: Date) {
    const timeOffset = new Date(timestamp).getTimezoneOffset() * 60 * 1000;
    return new Date(new Date(timestamp).getTime() - timeOffset);
}

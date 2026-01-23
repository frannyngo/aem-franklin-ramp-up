export function camelCase(string) {
    return string.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') 
        .trim()
        .split(/\s+/)
        .map((word, index) =>
        index === 0
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
}
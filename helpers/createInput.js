/**
 * @param {Object} args
 * @param {string} args.placeholder
 * @param {boolean} args.isRequired
 * @param {string} args.type
 * @param {string} args.className
 */

export function createInput({ placeholder, isRequired, type, className }) {
    const input = document.createElement('input');
    input.type = type ?? 'text';
    input.placeholder = placeholder ?? '';
    input.required = Boolean(isRequired);
    input.className = className ?? 'input'

  return input;
}
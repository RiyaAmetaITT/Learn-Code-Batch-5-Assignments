export function validateLocationInput(input: string) {
  const sanitized = input.trim();
  if (sanitized.length < 2) return { isValid: false, errorMessage: 'Too short.' };
  if (!/[a-zA-Z]/.test(sanitized)) return { isValid: false, errorMessage: 'Need letters.' };
  return { isValid: true, sanitized };
}

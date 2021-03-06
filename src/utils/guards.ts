/** Determines if string is non-empty and valid */
export const isValidString = (it: unknown): it is string => {
  return it != null && typeof it === 'string' && it.trim().length !== 0
}
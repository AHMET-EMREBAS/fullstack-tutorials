import { Transform } from 'class-transformer';

/**
 * Trim the string value
 * @returns
 */
export function TrimTransformer() {
  return Transform(
    ({ value }) => (value && value.trim && value.trim()) || value
  );
}

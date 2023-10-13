import { Transform } from 'class-transformer';

export function TrimTransformer() {
  return Transform(
    ({ value }) => (value && value.trim && value.trim()) || value
  );
}

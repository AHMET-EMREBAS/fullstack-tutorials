import { Provider, isDevMode } from '@angular/core';
import { BASE_API_URL } from '@techbir/material';

export function provideApiURL(): Provider {
  return {
    provide: BASE_API_URL,
    useValue: isDevMode()
      ? 'https://localhost:3000'
      : 'https://10.0.0.149:3000',
  };
}


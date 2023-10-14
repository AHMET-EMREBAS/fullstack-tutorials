import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthTokenInterceptor, BaseUrlInterceptor } from '@techbir/material';

export function provideAuthInterceptor(): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  };
}

export function provideBaseApiURLInterceptor(): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  };
}

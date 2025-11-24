import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
// NOTE: `provideClientHydration` is applied in `main.ts` (browser bootstrap)
// (hydration moved to main.ts)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    // provideClientHydration(withEventReplay())
  ]
};

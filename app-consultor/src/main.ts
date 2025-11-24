import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Aplicar `provideClientHydration` somente no bootstrap do cliente para evitar
// criar plataformas diferentes entre servidor e cliente (erro NG0400).
const clientProviders = [
  // Mantém os providers gerais definidos em `appConfig` e adiciona hidratação do cliente
  ...((appConfig && appConfig.providers) || []),
  provideClientHydration(withEventReplay())
];

bootstrapApplication(AppComponent, { providers: clientProviders })
  .catch((err) => console.error(err));

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Avoid prerendering dynamic routes (e.g. consultor/editar/:id) which require
    // getPrerenderParams. Use client rendering for all routes in CI builds to
    // prevent build-time prerender failures.
    renderMode: RenderMode.Client
  }
];

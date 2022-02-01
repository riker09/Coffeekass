// augmenations.d.ts

// @see https://stackoverflow.com/a/63999522/9756676

// Ensure this file is parsed as a module regardless of dependencies.
export {}
import { LayoutKeys } from './layouts/boot';

declare module 'vue-router' {
  interface RouteMeta {
    anonymous?: boolean;
    layout?: LayoutKeys;
  }
}

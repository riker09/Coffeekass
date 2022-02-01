import Default from './Default.vue';
import NoMenu from './NoMenu.vue';

// Add more layouts here...
export const LAYOUTS = {
  'DefaultLayout': Default,
  'NoMenuLayout': NoMenu,
} as const;

export type LayoutKeys = keyof typeof LAYOUTS;
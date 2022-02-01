import { Router } from 'vue-router';
import { routes } from '../router';

export const redirectTarget = (router: Router) => {
  const wanted = router.currentRoute.value.query.redirect || '/';

  const routeValue = routes.find((v) => v.path === wanted);

  return () => routeValue?.path || '/';
};

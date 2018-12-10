import createObservable from 'rxjs-router5';
import createRouter, { State } from 'router5';
import browserPlugin from "router5/plugins/browser";
import { from } from 'rxjs';
import { startWith } from 'rxjs/operators';



export function initializeRouter(routes: {name: string, path: string}[], initialState: State = null) {
  const router = createRouter(routes)
    .usePlugin(browserPlugin({
      useHash: true
    }))
    .start();
  const { route$, ...rest } = createObservable(router)
  return {
    router,
    ...rest,
    route$: route$.startWith(initialState)
  }
}

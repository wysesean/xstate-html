import Route from 'route-parser';
import { assign, send, MachineConfig, StateMachine, TypesState } from 'xstate';

export enum Locations {
  'details' = 'details/:id',
  'about' = 'about',
  'home' = 'home'
}

export enum States {
  'init' = 'init',
  'details' = 'DETAILS',
  'about' = 'ABOUT',
  'home' = 'HOME',
  'error' = 'ERROR'
}

export enum Event {
  'navigateHome' = 'NAVIGATE_HOME',
  'navigateAbout' = 'NAVIGATE_ABOUT',
  'navigateDetails' = 'NAVIGATE_DETAILS'
}

export type RouterEventTypes =
  | { type: Event.navigateHome; hash: Locations.home }
  | { type: Event.navigateAbout; hash: Locations.about }
  | {
      type: Event.navigateDetails;
      hash: Locations.details;
      params: { id: string };
    }
  | { type: ''; hash: undefined };

export interface RouteContext {
  hash: typeof Locations;
  params: unknown;
}

export interface RouterContext {
  route: any;
  locations: typeof Locations;
}

export interface RouterSchema {
  initial: States.init;
  states: {
    [States.init]: {};
    [States.details]: {};
    [States.about]: {};
    [States.home]: {};
    [States.error]: {};
  };
}

export type RouterState =
  | ({
      value: [States.init];
      context: RouterContext & { route: null; locations: Locations };
    } & TypesState<RouteContext>)
  | ({
      value: [States.details];
      context: RouterContext & { route: string; locations: Locations };
    } & TypesState<RouteContext>)
  | ({
      value: [States.about];
      context: RouterContext & { route: string; locations: Locations };
    } & TypesState<RouteContext>)
  | ({
      value: [States.home];
      context: RouterContext & { route: string; locations: Locations };
    } & TypesState<RouteContext>)
  | ({ value: [States.error]; context: any } & TypesState<RouteContext>)
  | ({ value: ''; context: null } & TypesState<RouteContext>);

export type RouterMachineConfig = StateMachine<
  RouterContext,
  RouterSchema,
  RouterEventTypes
>;

export const routerConfig: MachineConfig<
  RouterContext,
  RouterSchema,
  RouterEventTypes
> = {
  id: 'router',
  initial: States.init,
  context: {
    route: null,
    locations: {
      ...Locations
    }
  },
  states: {
    [States.init]: {
      entry: ['startup'],
      on: {
        '': [
          {
            target: [States.details],
            cond: { type: 'verifyRoute', location: Locations.details }
          },
          {
            target: [States.about],
            cond: { type: 'verifyRoute', location: Locations.about }
          },
          {
            target: [States.home],
            cond: { type: 'verifyRoute', location: Locations.home }
          },
          { target: [States.error] }
        ]
      }
    },
    [States.details]: {
      entry: ['updateRoute'],
      on: {
        [Event.navigateHome]: [States.home],
        [Event.navigateDetails]: [States.details],
        [Event.navigateAbout]: [States.about]
      }
    },
    [States.about]: {
      entry: ['updateRoute'],
      on: {
        [Event.navigateHome]: [States.home],
        [Event.navigateDetails]: [States.details],
        [Event.navigateAbout]: [States.about]
      }
    },
    [States.home]: {
      entry: ['updateRoute'],
      on: {
        [Event.navigateHome]: [States.home],
        [Event.navigateDetails]: [States.details],
        [Event.navigateAbout]: [States.about]
      }
    },
    [States.error]: {
      entry: send({ type: Event.navigateHome, hash: Locations.home }),
      on: {
        [Event.navigateHome]: [States.home]
      }
    }
  }
};

export const routerServices = {};

export const routerActions = {
  startup: assign({
    route: (ctx: RouterContext, evt: RouterEventTypes) => {
      const hash = window.location.hash.substring(1);
      const locations = Object.values(ctx.locations);

      const location = locations.find((location: string) => {
        const route = new Route(location);
        return route.match(hash) !== null;
      }) as string;

      const route = new Route(location);
      const params = route.match(hash);

      return {
        hash,
        params: params || null
      };
    }
  }),
  updateRoute: assign({
    route: (ctx: RouterContext, evt: RouterEventTypes) => {
      const { type, hash } = evt;
      const params =
        (evt as RouterEventTypes & { params: unknown }).params ?? null;
      if (type === '') {
        return ctx.route;
      }
      if (hash) {
        window.location.hash = hash;
      }
      return {
        hash,
        params
      };
    }
  })
};

export const routerGuards = {
  verifyRoute: (
    context: RouterContext,
    event: RouterEventTypes,
    { cond }: { cond: { location: Locations } }
  ) => {
    const hash = window.location.hash.substring(1);
    const route = new Route(cond.location);
    if (route.match(hash)) {
      return true;
    }
    return false;
  }
};

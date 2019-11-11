import Route from 'route-parser';
import { assign, send } from 'xstate';

const locations = {
  details: 'details/:id',
  about: 'about',
  home: 'home'
};

export const routerConfig = {
  id: 'router',
  initial: 'init',
  context: {
    route: null,
    locations
  },
  states: {
    init: {
      entry: ['startup'],
      on: {
        '': [
          {
            target: 'DETAILS',
            cond: { type: 'verifyRoute', location: locations.details }
          },
          {
            target: 'ABOUT',
            cond: { type: 'verifyRoute', location: locations.about }
          },
          {
            target: 'HOME',
            cond: { type: 'verifyRoute', location: locations.home }
          },
          { target: 'ERROR' }
        ]
      }
    },
    DETAILS: {
      entry: ['updateRoute'],
      on: {
        NAVIGATE_HOME: 'HOME',
        NAVIGATE_DETAILS: 'DETAILS',
        NAVIGATE_ABOUT: 'ABOUT'
      }
    },
    ABOUT: {
      entry: ['updateRoute'],
      on: {
        NAVIGATE_HOME: 'HOME',
        NAVIGATE_DETAILS: 'DETAILS',
        NAVIGATE_ABOUT: 'ABOUT'
      }
    },
    HOME: {
      entry: ['updateRoute'],
      on: {
        NAVIGATE_HOME: 'HOME',
        NAVIGATE_DETAILS: 'DETAILS',
        NAVIGATE_ABOUT: 'ABOUT'
      }
    },
    ERROR: {
      entry: send({ type: 'NAVIGATE_HOME', hash: 'home' }),
      on: {
        NAVIGATE_HOME: 'HOME'
      }
    }
  }
};

export const routerServices = {};

export const routerActions = {
  startup: assign({
    route: (ctx, evt) => {
      const hash = window.location.hash.substring(1);
      const locations = Object.values(ctx.locations);

      const location = locations.find(location => {
        const route = new Route(location);
        return route.match(hash) !== null;
      });

      const route = new Route(location);
      const params = route.match(hash);

      return {
        hash,
        params: params || null
      };
    }
  }),
  updateRoute: assign({
    route: (ctx, evt) => {
      if (evt.type === '') {
        return ctx.route;
      }
      if (evt.hash) {
        window.location.hash = evt.hash;
      }
      return {
        hash: evt.hash,
        params: evt.params || null
      };
    }
  })
};

export const routerGuards = {
  verifyRoute: (context, event, { cond }) => {
    const hash = window.location.hash.substring(1);
    const route = new Route(cond.location);
    if (route.match(hash)) {
      return true;
    }
    return false;
  }
};

import { render } from 'lit-html';
import { AppTemplate } from '~views/app';
import { interpret, createMachine } from 'xstate';
import {
  routerConfig,
  routerActions,
  routerServices,
  routerGuards,
  RouterContext,
  RouterEventTypes,
  RouterState
} from '~state-machines/router-machine';
import { AppService, AppState } from '~util/types';

function bootStrap() {
  const machine = createMachine<RouterContext, RouterEventTypes, RouterState>(
    {
      ...routerConfig
    },
    {
      actions: { ...routerActions },
      services: { ...routerServices },
      guards: { ...routerGuards }
    }
  );
  const service = interpret(machine);

  service.onTransition(state => {
    if (state.changed) {
      requestAnimationFrame(() => renderApp(state, service));
    }
  });

  service.start();
}

function renderApp(state: AppState, services: AppService) {
  console.group(state.value as string);
  console.log(state.context);
  console.groupEnd();
  render(
    AppTemplate(state, services),
    document.getElementById('app') as HTMLElement
  );
}

bootStrap();

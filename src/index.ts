import { render } from 'lit-html';
import { AppTemplate } from '~views/app';
import { Machine, interpret, assign } from 'xstate';
import {
  routerConfig,
  routerActions,
  routerServices,
  routerGuards
} from '~state-machines/router-machine';

function bootStrap() {
  const machine = Machine(
    {
      ...routerConfig,
    },
    {
      actions: { ...routerActions },
      services: { ...routerServices },
      guards: { ...routerGuards }
    }
  );
  const service = interpret(machine);

  service.onTransition(state => {
    renderApp(state, service);
  });

  service.start();
}

function renderApp(state, services) {
  console.group(state.value)
  console.log(state.context)
  console.groupEnd()
  render(AppTemplate(state, services), document.getElementById('app'));
}

bootStrap();

import { render } from "lit-html";
import { routes } from "./routes";
import { AppTemplate } from "~views/app";
import { initializeMachine } from "~util/initialize-machine";
import { initializeRouter } from "~util/initialize-router";
import { lightsConfig } from "~state-machines/lights-machine";
import { combineLatest } from "rxjs";

function renderApp(state, services) {
  render(AppTemplate(state, services), document.getElementById("app"));
}

function bootStrap() {
  const {
    state$: lightMachineState$,
    service: lightService
  } = initializeMachine(lightsConfig);
  const { route$, router } = initializeRouter(routes);

  const state$ = combineLatest(
    lightMachineState$,
    route$
  );

  const services = {
    lightService: lightService,
    router
  }

  lightMachineState$.subscribe(y => console.log('machinestate', y))

  state$.subscribe(([lightState, routerState]) => {
    renderApp({lightState, routerState}, services);
  });
}

bootStrap();

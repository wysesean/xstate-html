import { StateListener, Interpreter, interpret } from "xstate/lib/interpreter";
import { fromEventPattern, Observable } from "rxjs";
import { startWith, map, tap } from "rxjs/operators";
import { EventObject, Machine, MachineConfig, MachineOptions, StateNode } from "xstate";

export function initializeMachine<TContext, TStateSchema, TEvent>(
  config: MachineConfig<TContext, TStateSchema, EventObject>,
  options?: MachineOptions<TContext, EventObject>,
  initialContext?: TContext
) {
  const machine = Machine<TContext, TStateSchema, EventObject>(config, options);
  const initialState = machine.initialState;
  const service = interpret(machine).init();
  service.start();
  const state$ = fromEventPattern((callback: StateListener) => {
    service.onTransition(callback);
  }).pipe(
    startWith([initialState, null])
  )
  
  return {
    state$,
    service
  }
}

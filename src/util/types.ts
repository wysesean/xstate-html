import { TemplateResult } from 'lit-html';
import { Interpreter, State } from 'xstate';

export type AppState = State<any, any, any>;

export type AppService = Interpreter<any, any, any>;

export type TemplateFunction = (
  state: AppState,
  service: AppService
) => TemplateResult;

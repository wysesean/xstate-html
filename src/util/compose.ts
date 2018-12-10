type ComposableFunction = (...args: Array<any>) => any;

export function compose(...funcs: Array<ComposableFunction>): ComposableFunction {
  return funcs.reduce(
    (previousFunction: ComposableFunction, currentFunction: ComposableFunction) => {
      return (...args: Array<any>): any => {
        return currentFunction(previousFunction(...args));
      }
    },
  );
}

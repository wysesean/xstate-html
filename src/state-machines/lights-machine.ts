import { Machine, MachineConfig, EventObject } from 'xstate';
// The hierarchical (recursive) schema for the states
export interface LightsSchema {
  states: {
    green: {};
    yellow: {};
    red: {
      states: {
        walk: {};
        wait: {};
        stop: {};
      };
    };
  };
}

// The events that the machine handles
export type LightsEvent =
  | { type: "TIMER" }
  | { type: "POWER_OUTAGE" }
  | { type: "PED_COUNTDOWN"; duration: number };

// The context (extended state) of the machine
export interface LightsContext {
  elapsed: number;
}

export const lightsConfig: MachineConfig<LightsContext, LightsSchema, EventObject> = Machine<LightsContext, LightsSchema, LightsEvent>({
  key: "light",
  initial: "green",
  context: { elapsed: 0 },
  states: {
    green: {
      on: {
        TIMER: "yellow",
        POWER_OUTAGE: "red"
      }
    },
    yellow: {
      on: {
        TIMER: "red",
        POWER_OUTAGE: "red"
      }
    },
    red: {
      on: {
        TIMER: "green",
        POWER_OUTAGE: "red"
      },
      initial: "walk",
      states: {
        walk: {
          on: {
            PED_COUNTDOWN: "wait"
          }
        },
        wait: {
          on: {
            PED_COUNTDOWN: {
              target: "stop",
              cond: (ctx, e) => {
                return e.duration === 0 && ctx.elapsed > 0;
              }
            }
          }
        },
        stop: {
          on: {
            "": { target: "green" }
          }
        }
      }
    }
  }
});

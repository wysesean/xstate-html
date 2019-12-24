import { assign, spawn, createMachine } from 'xstate';

export const animationsConfig = {
  id: 'animations',
  context: {
    animations: []
  },
  initial: 'listening',
  states: {
    listening: {
      on: {
        ANIMATE_HEADER: {
          actions: ['registerAnimation', 'animateHeader']
        },
        DISABLE_ANIMATIONS: 'off'
      }
    },
    off: {
      entry: ['unmountAnimations'],
      on: {
        ENABLE_ANIMATIONS: 'idle'
      }
    }
  }
};

export const animationTrackerMachine = {
  id: 'animationTracker',
  context: {
    element: null,
    animations: {
      entry: null,
      exit: null
    }
  },
  initial: 'init',
  states: {
    mount: {
      entry: ['startup'],
      on: {
        '': 'idle'
      }
    },
    idle: {
      on: {
        PLAY_ANIMATION_ENTRY: 'entry_animation',
        COMPONENT_UNMOUNT: 'unmount'
      }
    },
    entry_animation: {
      entry: ['playEntryAnimation'],
      on: {
        PLAY_ANIMATION_EXIT: 'idle',
        CANCEL_ANIMATION: 'idle',
        COMPONENT_UNMOUNT: 'exit'
      },
      exit: ['stopAnimation']
    },
    exit_animation: {
      entry: ['playExitAnimation'],
      on: {
        '': 'unmount'
      },
      exit: ['stopAnimation']
    },
    unmount: {
      entry: ['cleanup'],
      type: 'final'
    }
  }
};

export const animationActions = {
  startAnimation: assign({
    animations: {
      ref: spawn(createMachine(animationTrackerMachine))
    }
  })
};

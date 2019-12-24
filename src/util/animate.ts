import { AppState, AppService } from '~util/types';
import { directive, AttributePart } from 'lit-html';

const stateMap = new WeakMap<AttributePart, HTMLAnchorElement>();

type AnimationLifecycles = {
  entry: string;
  exit: string;
};

export const animate = (
  state: AppState,
  service: AppService,
  animationLifecycles: Partial<AnimationLifecycles>
) => {
  return directive((event, service: AppService) => (part: AttributePart) => {
    if (!(part instanceof AttributePart)) {
      throw new Error(
        'animate can only be used can only be used in attribute bindings'
      );
    }
    if (part.committer.name !== 'animate') {
      throw new Error(
        'animate can only be used can only be used in .animate attribute binding'
      );
    }
    const { element } = part.committer;
    const { entry, exit } = animationLifecycles;

    // TODO:
    // Add hook to trigger exit transition.
    service.send({ type: entry, element });
    part.commit();
  })(event, service);
};

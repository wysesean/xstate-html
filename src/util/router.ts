import { cache } from 'lit-html/directives/cache.js';
import { TemplateResult, AttributePart, directive } from 'lit-html';
import { AppState, AppService } from '~util/types';
import { States, Event as RouterEvent } from '~state-machines/router-machine';

export const Switch = (
  { value }: AppState,
  templateValues: { value: States; template: TemplateResult }[]
) => {
  const { template } = templateValues.find(
    template => template.value === value
  ) ?? {
    template: null
  };

  if (template) {
    return cache(template);
  }
  throw new Error(
    `No matching template found for {value: ${value}} in ${template}`
  );
};

const stateMap = new WeakMap<AttributePart, HTMLAnchorElement>();

export const navigate = (type: RouterEvent, service: AppService) => {
  return directive(
    (type: RouterEvent | string, service: AppService) => (
      part: AttributePart
    ) => {
      if (!(part instanceof AttributePart)) {
        throw new Error(
          'navigate can only be used can only be used in attribute bindings'
        );
      }
      if (part.committer.name !== 'navigate') {
        throw new Error(
          'navigate can only be used can only be used in .navigate attribute binding'
        );
      }
      if (part?.committer?.element?.localName !== 'a') {
        throw new Error('navigate can only be used can only an <a></a>');
      }

      const element = part.committer.element as HTMLAnchorElement & {
        params: unknown;
      };
      let state = stateMap.get(part);
      if (state === undefined) {
        element.addEventListener('click', evt => {
          evt.preventDefault();
          const { hash, params } = element;
          service.send({
            type,
            hash,
            params
          });
        });
        stateMap.set(part, element);
      }
      part.setValue(state);
      part.commit();
    }
  )(type, service);
};

import { StyleSheet, css } from 'aphrodite-jss';
import { html } from 'lit-html';
import { Switch, Link } from '~util/router';
import { classMap } from 'lit-html/directives/class-map.js';

const sheet = StyleSheet.create({
  blue: {
    color: 'blue'
  },
  red: {
    color: 'red'
  }
});

const HomeTemplate = html`
  <div>
    <p class="text-primary">
      Lorem ipsum crackalackin black amet, sizzle adipiscing ass. Bizzle we
      gonna chung velizzle, pimpin' volutpizzle, suscipit brizzle, the bizzle
      vizzle, arcu. Pellentesque egizzle tortor. Sed erizzle. Fusce izzle pizzle
      dapibizzle turpizzle tempizzle for sure. Maurizzle pellentesque nibh bow
      wow wow izzle. Sizzle izzle tortor.
    </p>
  </div>
`;

const AboutTemplate = html`
  <div class="bg-dark">
    <p class="text-secondary">
      Space, the final frontier. These are the voyages of the Starship
      Enterprise. Its five-year mission: to explore strange new worlds, to seek
      out new life and new civilizations, to boldly go where no man has gone
      before. Many say exploration is part of our destiny, but it’s actually our
      duty to future generations and their quest to ensure the survival of the
      human species.
    </p>
  </div>
`;

const DetailsTemplate = html`
  <div>
    <p class="text-success">
      Nori grape silver beet broccoli kombu beet greens fava bean potato
      quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil
      turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter
      purslane fennel azuki bean earthnut pea sierra leone bologi leek soko
      chicory celtuce parsley jícama salsify.
    </p>
  </div>
`;

const ErrorTemplate = html`
  <div>
    <h1>
      404
    </h1>
  </div>
`;

export const AppTemplate = (state, service) => html`
  <div>
    <nav>
      <h3
        class="${classMap({
          [css(sheet.blue)]: state.matches('HOME'),
          [css(sheet.red)]: state.matches('ABOUT')
        })}
      "
      >
        ${state.value}
      </h3>
      ${Link(
        {
          type: 'NAVIGATE_HOME',
          content: 'Home',
          route: 'home'
        },
        service
      )}
      ${Link(
        {
          type: 'NAVIGATE_ABOUT',
          content: 'About',
          route: 'about'
        },
        service
      )}
      ${Link(
        {
          type: 'NAVIGATE_DETAILS',
          content: 'Details',
          route: 'details/:id',
          params: { id: 5 }
        },
        service
      )}
    </nav>
    ${Switch(state.value, [
      {
        value: 'HOME',
        template: HomeTemplate
      },
      {
        value: 'ABOUT',
        template: AboutTemplate
      },
      {
        value: 'DETAILS',
        template: DetailsTemplate
      },
      {
        value: 'ERROR',
        template: ErrorTemplate
      }
    ])}
  </div>
`;

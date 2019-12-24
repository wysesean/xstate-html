import { css, StyleSheet } from '~styles/aphrodite-jss';
import { html } from 'lit-html';
import { Switch } from '~util/router';
import { Header } from '~views/components/header';
import { States } from '~state-machines/router-machine';
import { TemplateFunction, AppState, AppService } from '~util/types';

const sheet = StyleSheet.create({
  topless: {
    'margin-top': '-12px',
    'margin-bottom': '-12px'
  }
});

const NewsTemplate: TemplateFunction = () => html`
  <div class="column col-10 col-mx-auto pt-2">
    <p class="">
      Lorem ipsum crackalackin black amet, sizzle adipiscing ass. Bizzle we
      gonna chung velizzle, pimpin' volutpizzle, suscipit brizzle, the bizzle
      vizzle, arcu. Pellentesque egizzle tortor. Sed erizzle. Fusce izzle pizzle
      dapibizzle turpizzle tempizzle for sure. Maurizzle pellentesque nibh bow
      wow wow izzle. Sizzle izzle tortor.
    </p>
  </div>
`;

const AboutTemplate: TemplateFunction = () => html`
  <div class="column col-10 col-mx-auto pt-2">
    <p class="">
      Space, the final frontier. These are the voyages of the Starship
      Enterprise. Its five-year mission: to explore strange new worlds, to seek
      out new life and new civilizations, to boldly go where no man has gone
      before. Many say exploration is part of our destiny, but it’s actually our
      duty to future generations and their quest to ensure the survival of the
      human species.
    </p>
  </div>
`;

const DetailsTemplate: TemplateFunction = () => html`
  <div class="column col-10 col-mx-auto pt-2">
    <p class="">
      Nori grape silver beet broccoli kombu beet greens fava bean potato
      quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil
      turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter
      purslane fennel azuki bean earthnut pea sierra leone bologi leek soko
      chicory celtuce parsley jícama salsify.
    </p>
  </div>
`;

const ErrorTemplate: TemplateFunction = () => html`
  <div>
    <h1>
      404
    </h1>
  </div>
`;

export const AppTemplate: TemplateFunction = (
  state: AppState,
  service: AppService
) => html`
  <div class="${css(sheet.topless)}">
    <progress class="progress" value="" max="100"></progress>
  </div>
  ${Header(state, service)}
  <div class="container p-2">
    <div class="columns">
      ${Switch(state, [
        {
          value: States.home,
          template: NewsTemplate(state, service)
        },
        {
          value: States.about,
          template: AboutTemplate(state, service)
        },
        {
          value: States.details,
          template: DetailsTemplate(state, service)
        },
        {
          value: States.error,
          template: ErrorTemplate(state, service)
        }
      ])}
    </div>
  </div>
`;

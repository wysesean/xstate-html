import { GlobalStyles } from './../../styles/globalStyles';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { navigate } from '~util/router';
import { TemplateFunction } from '~util/types';
import { StyleSheet, css } from '~styles/aphrodite-jss';
import { States, Event } from '~state-machines/router-machine';
import { animate } from '~util/animate';

const sheet = StyleSheet.create({
  tab: {
    border: 'none'
  }
});

export const Header: TemplateFunction = (state, service) => html`
  <header
    id="header"
    .animate="${animate(state, service, {
      entry: 'ANIMATE_ENTRY_HEADER',
      exit: 'ANIMATE_EXIT_HEADER'
    })}"
  >
    <ul class="tab ${css(sheet.tab)}">
      <li
        class="tab-item 
        ${classMap({
          active: state.matches(States.details)
        })}"
      >
        <a
          href="#details/${5}"
          class="${classMap({
            'text-primary': !state.matches(States.details)
          })}"
          .params=${{ id: 5 }}
          .navigate=${navigate(Event.navigateDetails, service)}
          >Details</a
        >
      </li>
      <li
        class="tab-item 
      ${classMap({
          active: state.matches(States.about)
        })}"
      >
        <a
          href="#about"
          class="${classMap({
            'text-primary': !state.matches(States.about)
          })}"
          .navigate=${navigate(Event.navigateAbout, service)}
          >About</a
        >
      </li>
      <li
        class="tab-item ${classMap({
          active: state.matches(States.home)
        })}"
      >
        <a
          href="#home"
          class="${classMap({
            'text-primary': !state.matches(States.home)
          })}"
          .navigate=${navigate(Event.navigateHome, service)}
          >Home</a
        >
      </li>
      <li class="tab-item tab-action">
        <div class="input-group input-inline">
          <input
            class="${css(
              GlobalStyles.inputColor
            )} text-dark form-input input-sm"
            type="text"
          />
          <button
            class="${css(
              GlobalStyles.buttonColor
            )} bold btn btn-primary btn-sm input-group-btn"
          >
            Search
          </button>
        </div>
      </li>
    </ul>
  </header>
`;

import { html } from "lit-html";
import { Link } from "~util/router";
import { StyleSheet, css } from "~styles/aphrodite-jss";

const sheet = StyleSheet.create({
  blue: {
    color: "blue"
  },
  red: {
    color: "red"
  }
});

export const Header = (state, service) => {
  return html`
    <header class="navbar">
      <section class="navbar-section">
        ${Link(state, service, {
          type: "NAVIGATE_HOME",
          content: "Home",
          route: "home",
          classInfo: {
            btn: true,
            "btn-link": true,
            "text-bold": state.matches("HOME"),
            [css(sheet.blue)]: state.matches("HOME")
          }
        })}
        ${Link(state, service, {
          type: "NAVIGATE_ABOUT",
          content: "About",
          route: "about",
          classInfo: {
            btn: true,
            "btn-link": true,
            "text-bold": state.matches("ABOUT"),
            [css(sheet.red)]: state.matches("ABOUT")
          }
        })}
        ${Link(state, service, {
          type: "NAVIGATE_DETAILS",
          content: "Details",
          route: "details/:id",
          params: { id: 5 },
          classInfo: {
            btn: true,
            "btn-link": true,
            "text-bold": state.matches("DETAILS")
          }
        })}
      </section>
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="search" />
          <button class="btn btn-primary input-group-btn">Search</button>
        </div>
      </section>
    </header>
  `;
};

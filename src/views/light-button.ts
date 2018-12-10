import { html } from 'lit-html';
import { StyleSheet, css } from "aphrodite-jss";

export const LightButtonTemplate = (state, service) => html`
  <button class="${css(styles.button)}" @click=${() => service.lightService.send("TIMER")}>
    TIMER ${state.lightState.value}
  </button>
`


const styles = StyleSheet.create({
  red: {
    background: "red"
  },
  green: {
    background: "green"
  },
  yellow: {
    background: "yellow"
  }
}); 
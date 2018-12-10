import { StyleSheet, css } from "aphrodite-jss";
import { html } from "lit-html";
import { LightButtonTemplate } from "./light-button";

export const AppTemplate = (state, service) => html`
  <div>
    <a @click="${() => service.router.navigate("home")}">Home</a> ${
      LightButtonTemplate(state, service)
    }
    <button
      @click=${
        () => {
          service.lightService.send("POWER_OUTAGE");
        }
      }
      class="${css(styles.button)}"
    >
      Power Outage
    </button>
  </div>
`;

const styles = StyleSheet.create({
  button: {
    background: "red"
  }
});

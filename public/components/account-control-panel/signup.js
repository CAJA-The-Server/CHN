import $ from "jquery";
import { createComponent } from "../../js/component.js";
import { createJQuerySelector } from "../../js/shadowJQuery.js";
import {} from "./panel.js";
import {} from "./slide.js";

createComponent(
  import.meta.url,
  (Component) =>
    class SignupPanel extends Component {
      constructor(protectedProps) {
        super(protectedProps);
        const $$ = createJQuerySelector(protectedProps.shadowRoot);
        const $this = $(this);

        const $panel = $$("#panel");

        const $authTokenSlide = $panel.find("#auth-token-slide");
        const $idSlide = $panel.find("#id-slide");
        const $passwordSlide = $panel.find("#password-slide");
        const $passwordConfirmSlide = $panel.find("#password-confirm-slide");
        const $nameSlide = $panel.find("#name-slide");

        let authToken;
        let id;
        let password;
        let name;

        $authTokenSlide.on("submit", async () => {
          const value = $authTokenSlide.prop("value");

          const validation = await fetch("/api/validate/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: value }),
          }).then((res) => res.json());

          if (!validation.valid) {
            $authTokenSlide.triggerHandler("error", ["Invalid token."]);
            return;
          }

          authToken = value;
          $panel.triggerHandler("nextSlide");
        });

        $idSlide.on("submit", async () => {
          const value = $idSlide.prop("value");

          const validation = await fetch("/api/validate/id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: value }),
          }).then((res) => res.json());

          if (!validation.valid) {
            $idSlide.triggerHandler("error", validation.messages);
            return;
          }

          if (validation.exists) {
            $idSlide.triggerHandler("error", ["ID already exists."]);
            return;
          }

          id = value;
          $panel.triggerHandler("nextSlide");
        });

        $passwordSlide.on("submit", async () => {
          const value = $passwordSlide.prop("value");

          const validation = await fetch("/api/validate/password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: value }),
          }).then((res) => res.json());

          if (!validation.valid) {
            $passwordSlide.triggerHandler("error", validation.messages);
            return;
          }

          password = value;
          $panel.triggerHandler("nextSlide");
        });

        $passwordConfirmSlide.on("submit", () => {
          const passwordConfirm = $passwordConfirmSlide.prop("value");

          if (password !== passwordConfirm) {
            $passwordConfirmSlide.triggerHandler("error", [
              "Password does not match.",
            ]);
            return;
          }

          $panel.triggerHandler("nextSlide");
        });

        $nameSlide.on("submit", async () => {
          const value = $nameSlide.prop("value");

          const validation = await fetch("/api/validate/name", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: value }),
          }).then((res) => res.json());

          if (!validation.valid) {
            $nameSlide.triggerHandler("error", validation.messages);
            return;
          }

          name = value;

          const res = await fetch("/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authToken,
              id,
              password,
              name,
            }),
          });

          if (!res.ok) {
            alert("Unknown Error. Sign up failed.");
            return;
          }

          await fetch("/user/log", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              password,
            }),
          });

          const $modal = $this.closest("x-modal");
          $modal.fadeOut(200, () => $modal.trigger("close", [true]));
        });

        $this.on("focusPanel", (event) => {
          if (event.target !== this) return;
          $panel.triggerHandler("focusSlide");
        });
      }
    }
);

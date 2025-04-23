import { defineStore } from "pinia";

import { RestMetadata } from "@/models";

export const useAlertsStore = defineStore("alerts", {
  state: () => ({
    progress: false,

    snackbar: {
      ok: "",
      content: "",
      button: "OK",
      type: "primary",
      timeout: 10000,
      visible: false,
    },

    message: {
      title: "",
      content: "",
      button: "OK",
      visible: false,
    },
  }),

  actions: {
    showProgress(value = true) {
      this.progress = !!value;
    },

    showSnackbar(
      content: string | RestMetadata,
      type: "primary" | "info" | "warning" | "error" | "success" = "primary",
      button: string = "OK",
      timeout: number = 10000
    ) {
      // check if content is string
      if (typeof content === "string") {
        this.snackbar.content = content;
        this.snackbar.type = type;
      } else {
        this.snackbar.content = content.message;
        this.snackbar.type = content.type;
      }

      this.snackbar.button = button;
      this.snackbar.timeout = timeout;
      this.snackbar.visible = true;
    },

    hideSnackbar() {
      this.snackbar.visible = false;
    },

    showMessage(content: string, title: string = "Peringatan", button: string = "OK") {
      this.message.content = content;
      this.message.title = title || "Peringatan";
      this.message.button = button || "OK";
      this.message.visible = true;
    },

    hideMessage() {
      this.message.visible = false;
    },
  },
});

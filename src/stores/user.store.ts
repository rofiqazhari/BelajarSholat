import { type TJWTPayload } from "@/types";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

type TSetUserParam = {
  username: string | null;
  userId: number | null;
  fullname: string | null;
  divisionId: number | null;
  professionId: number | null;
  paviliunId: number | null;
  dokterId: number | null;
  payload: TJWTPayload | null;
  badge: string;
};

export const useUserStore = defineStore("user", {
  state: (): TSetUserParam => ({
    fullname: localStorage.getItem("name") ?? "",
    userId: null,
    username: null,
    divisionId: null,
    paviliunId: null,
    professionId: null,
    dokterId: null,
    payload: null,
    badge: "",
  }),

  actions: {
    initUser() {
      const fullname = localStorage.getItem("name");
      const userId = localStorage.getItem("userId");
      const divisionId = localStorage.getItem("divisionId");
      const professionId = localStorage.getItem("professionId");
      const dokterId = localStorage.getItem("dokterId");
      const paviliunId = localStorage.getItem("paviliunId");
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const badge = localStorage.getItem("badge");

      this.username = username ?? "";
      this.fullname = fullname ?? "";
      this.userId = userId ? parseInt(userId) : null;
      this.dokterId = dokterId ? parseInt(dokterId) : null;
      this.divisionId = divisionId ? parseInt(divisionId) : null;
      this.professionId = professionId ? parseInt(professionId) : null;
      this.paviliunId = paviliunId ? parseInt(paviliunId) : null;
      this.payload = token ? <TJWTPayload>jwtDecode(token) : null;
      this.badge = badge ?? "";
    },
  },
});

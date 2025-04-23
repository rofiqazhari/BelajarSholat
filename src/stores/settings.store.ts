import { ref } from "vue";

import { defineStore } from "pinia";

import { printerService } from "@/services";
import { Printer } from "@/types";

// prettier-ignore
export const useSettingStore = defineStore("settings", () => {
    /**
     * Printer
     */
    const printerIp = ref("");
    const printer = ref<Printer | null>(null);
    const isLoadPrinter = ref(false);

    const ipList = ref<string[]>([])
    const printerList = ref<Printer[]>([]);
    const prefetchPrinter = async () => {
      const snapshot = await printerService.findAll(printerIp.value).catch(() => []);
      printerList.value = snapshot;
    };

    const isPrinterReady = () => {
      if (printer.value == null) return false;
      return true;
    };

    const fetchIpList = async () => {
      const ip = await printerService.findAllIP()
      ipList.value = ip
    }

    return {
      printer,
      printerList,
      printerIp,
      isLoadPrinter,
      ipList,
      prefetchPrinter,
      isPrinterReady,
      fetchIpList
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["printer", "printerIp"],
    },
  }
);

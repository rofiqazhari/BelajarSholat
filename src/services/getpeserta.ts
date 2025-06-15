import { DataPeserta } from "@/models/Peserta";
import { axios, formatResponse } from "@/plugins/axios";

import { RestResource } from "@/models";

const BASE_URL = `${import.meta.env.VITE_API_HOST}`;

export async function dataPeserta() {
  const url = `${BASE_URL}/profil_list`;

  const response = await axios.get<RestResource<DataPeserta[]>>(url);

  return formatResponse<DataPeserta[]>(DataPeserta, response);
}

export async function profil(idc: number) {
  const url = `${BASE_URL}/profil`;

  const response = await axios.get<RestResource<DataPeserta[]>>(url, {
    params: {
      idc: idc,
    },
  });

  return formatResponse<DataPeserta[]>(DataPeserta, response);
}

import { KunjunganPoliklinik } from "@/models/KunjunganPoliklinik";
import { axios, formatResponse } from "@/plugins/axios";

import { RestResource } from "@/models";

const BASE_URL = `${import.meta.env.VITE_API_HOST}`;

export async function kunjunganPoliklinik(tgl1: string, tgl2: string) {
  const url = `${BASE_URL}/kunjungan_poliklinik`;

  const response = await axios.get<RestResource<KunjunganPoliklinik[]>>(url, {
    params: {
      tgl1: tgl1,
      tgl2: tgl2,
    },
  });

  return formatResponse<KunjunganPoliklinik[]>(KunjunganPoliklinik, response);
}

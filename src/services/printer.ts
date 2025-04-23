import { plainToInstance } from "class-transformer";

import { axios } from "@/plugins/axios";

import { Printer } from "@/types";

const baseUrl = "https://api.cakdev.my.id/printer";
// const baseUrl = "http://107.108.0.21:5000";

export const findAll = async (address: string) => {
  const url = `${baseUrl}/list`;
  const { data } = await axios.get(url, { params: { address } });
  if (!data.connectionId) return [];
  return (data.printers as string[]).map((p, i) =>
    plainToInstance(Printer, { id: i, label: p, status: 1 })
  );
};

export const findAllIP = async () => {
  const url = `${baseUrl}/address`;
  const { data } = await axios.get<string[]>(url);
  return data;
};

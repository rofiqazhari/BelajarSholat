export type TResponseLogin = {
  id: string;
  name: string;
  username: string;
  divisionId: number;
  professionId: number;
  paviliunId: number;
  dokterId: number;
  token: string;
};

export type TResponseLoginExternal = {
  id: number;
  nama: string;
  scope: string;
  username: string;
  role: number;
  disable: boolean;
  token: string;
};

export type TResponseRefresh = {
  id: number;
  name: string;
  username: string;
  jwtToken: string;
};

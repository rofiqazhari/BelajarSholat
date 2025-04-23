export type TJWTPayload = {
  id: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
};

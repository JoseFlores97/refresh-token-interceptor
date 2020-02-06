export interface IToken {
  type: string;
  token: string;
  refreshToken: string;
}

export interface IRole {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface APIResponse<T> {
  data: T;
  message: string;
  type: string;
  http_code: number;
  errors: any[];
}

export interface RegisterResponse {
  created_at: string;
  deleted_at: null;
  email: string;
  id: string;
  lastname: string;
  name: string;
  surname: string;
  token: string;
  updated_at: string;
}

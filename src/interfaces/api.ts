export interface APIResponse<T> {
  data: T;
  message: string;
  type: string;
  http_code: number;
  errors: any[];
}

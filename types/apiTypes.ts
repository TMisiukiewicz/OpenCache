export interface SearchAndRetreive {
  search_method: string;
  search_params: SearchParams;
  retr_method: string;
  retr_params: RetreivalParams;
  wrap: boolean;
  format?: string;
  callback?: string;
}

export interface SearchParams {
  center?: string;
  status?: string;
  bbox?: string;
  limit?: string;
}

export interface RetreivalParams {
  fields?: string;
}

export interface RetreivalFields {
  name: string;
  location: string;
  type: string;
}

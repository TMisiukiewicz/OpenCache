export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LogInterface {
  comment: string;
  date: string;
  type: string;
  user: object; //TODO: user interface
  uuid: string;
}

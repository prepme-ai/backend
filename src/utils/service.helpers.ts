import { HttpStatusCode } from 'axios';

export type HSC = HttpStatusCode;

export interface CreateResponseI {
  message: string;
  statusCode: HSC;
  data?: object;
}

export const createResponse = ({ message, statusCode, data }: CreateResponseI): CreateResponseI => {
  return {
    message,
    statusCode,
    data,
  };
};

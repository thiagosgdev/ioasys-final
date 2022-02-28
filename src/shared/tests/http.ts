import { Response } from 'express';

export const mockStatusResponse = {
  send: jest.fn((x) => x),
};
export const mockResponse = {
  status: jest.fn((x) => mockStatusResponse),
  send: jest.fn((x) => x),
  locals: jest.fn(() => {
    id: 'test';
  }),
} as unknown as Response;

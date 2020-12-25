export class MockArgumentsHost {
  getRequest = jest.fn().mockReturnThis();
  getResponse = jest.fn().mockReturnThis();
  switchToHttp = jest.fn().mockReturnThis();
  status = jest.fn().mockReturnThis();
  json = jest.fn().mockImplementation((data) => data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockArgumentsHost = new MockArgumentsHost() as any;

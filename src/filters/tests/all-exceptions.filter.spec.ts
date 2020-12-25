import { Logger, UnauthorizedException } from '@nestjs/common';

import { AllExceptionsFilter } from '../all-exceptions.filter';

import { mockArgumentsHost } from './__mocks__/args-host.mock';

jest.mock('@nestjs/common/services/logger.service');

describe('AllExceptionsFilter', () => {
  let allExceptionsFilter: AllExceptionsFilter;

  beforeEach(() => {
    allExceptionsFilter = new AllExceptionsFilter();
  });

  it('should be defined', () => {
    expect(allExceptionsFilter).toBeDefined();
  });

  describe('catch', () => {
    it('should call logger with `UNAUTHORIZED`', () => {
      const error = new UnauthorizedException();
      allExceptionsFilter.catch(error, mockArgumentsHost);
      expect(mockArgumentsHost.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 401,
          errorCode: 'UNAUTHORIZED',
          errorMessage: 'Unauthorized',
        }),
      );
    });

    it('should call logger with `InternalServerErrorException`', () => {
      const logger = jest.spyOn(Logger.prototype, 'error');
      const error = new Error();
      allExceptionsFilter.catch(error, mockArgumentsHost);
      expect(logger).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          errorCode: 'INTERNAL_SERVER_ERROR',
          errorMessage: 'Internal server error',
        }),
      );
    });
  });
});

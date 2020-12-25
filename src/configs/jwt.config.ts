import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import ms = require('ms');

import { ConfigName } from '../constants';

function isIgnoreExpiration(jwtExpiresIn: string): boolean {
  return !(ms(jwtExpiresIn || '0') > 0);
}

export const jwtConfig = registerAs(
  ConfigName.JWT,
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: !isIgnoreExpiration(process.env.JWT_EXPIRES_IN)
      ? { expiresIn: process.env.JWT_EXPIRES_IN }
      : null,
  }),
);

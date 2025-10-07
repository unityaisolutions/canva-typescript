// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'canva';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Basic':
        const rawValue = Buffer.from(value, 'base64').toString();
        return {
          username: rawValue.slice(0, rawValue.search(':')),
          password: rawValue.slice(rawValue.search(':') + 1),
        };
      default:
        throw new Error(`Unsupported authorization scheme`);
    }
  }

  const username =
    Array.isArray(req.headers['x-canva-username']) ?
      req.headers['x-canva-username'][0]
    : req.headers['x-canva-username'];
  const password =
    Array.isArray(req.headers['x-canva-password']) ?
      req.headers['x-canva-password'][0]
    : req.headers['x-canva-password'];
  return { username, password };
};

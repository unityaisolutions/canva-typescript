// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/oauth/revoke',
  operationId: 'revokeTokens',
};

export const tool: Tool = {
  name: 'revoke_token_oauth',
  description:
    "Revoke an access token or a refresh token.\n\nIf you revoke a _refresh token_, be aware that:\n\n- The refresh token's lineage is also revoked. This means that access tokens created from that refresh token are also revoked.\n- The user's consent for your integration is also revoked. This means that the user must go through the OAuth process again to use your integration.\n\nRequests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:\n\n- **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.\n- **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.\n\nThis endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.",
  inputSchema: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'The token to revoke.',
      },
      client_id: {
        type: 'string',
        description:
          "Your integration's unique ID, for authenticating the request.\n\nNOTE: We recommend that you use basic access authentication instead of specifying `client_id` and `client_secret` as body parameters.\n",
      },
      client_secret: {
        type: 'string',
        description:
          "Your integration's client secret, for authenticating the request. Begins with `cnvca`.\n\nNOTE: We recommend that you use basic access authentication instead of specifying `client_id` and `client_secret` as body parameters.\n",
      },
    },
    required: ['token'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.oauth.revokeToken(body)) as object);
};

export default { metadata, tool, handler };

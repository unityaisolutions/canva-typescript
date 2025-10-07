// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'oauth',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/oauth/token',
  operationId: 'exchangeAccessToken',
};

export const tool: Tool = {
  name: 'create_token_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint implements the OAuth 2.0 `token` endpoint, as part of the Authorization Code flow with Proof Key for Code Exchange (PKCE). For more information, see [Authentication](https://www.canva.dev/docs/connect/authentication/).\n\nTo generate an access token, you must provide one of the following:\n\n- An authorization code\n- A refresh token\n\nGenerating a token using either an authorization code or a refresh token allows your integration to act on behalf of a user. You must first [obtain user authorization and get an authorization code](https://www.canva.dev/docs/connect/authentication/#obtain-user-authorization).\n\nAccess tokens may be up to 4 KB in size, and are only valid for a specified period of time. The expiry time (currently 4 hours) is shown in the endpoint response and is subject to change.\n\n**Endpoint authentication**\n\nRequests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:\n\n- **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.\n- **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.\n\nThis endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.\n\n**Generate an access token using an authorization code**\n\nTo generate an access token with an authorization code, you must:\n\n- Set `grant_type` to `authorization_code`.\n- Provide the `code_verifier` value that you generated when creating the user authorization URL.\n- Provide the authorization code you received after the user authorized the integration.\n\n**Generate an access token using a refresh token**\n\nUsing the `refresh_token` value from a previous user token request, you can get a new access token with the same or smaller scope as the previous one, but with a refreshed expiry time. You will also receive a new refresh token that you can use to refresh the access token again.\n\nTo refresh an existing access token, you must:\n\n- Set `grant_type` to `refresh_token`.\n- Provide the `refresh_token` from a previous token request.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Exchange auth token to access token.',\n  properties: {\n    access_token: {\n      type: 'string',\n      description: 'The bearer access token to use to authenticate to Canva Connect API endpoints. If requested using a `authorization_code` or `refresh_token`, this allows you to act on behalf of a user.'\n    },\n    expires_in: {\n      type: 'integer',\n      description: 'The expiry time (in seconds) for the token.'\n    },\n    refresh_token: {\n      type: 'string',\n      description: 'The token that you can use to refresh the access token.'\n    },\n    token_type: {\n      type: 'string',\n      description: 'The token type returned. This is always `Bearer`.'\n    },\n    scope: {\n      type: 'string',\n      description: 'The [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) that the token has been granted.'\n    }\n  },\n  required: [    'access_token',\n    'expires_in',\n    'refresh_token',\n    'token_type'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    anyOf: [
      {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The authorization code you received after the user authorized the integration.',
          },
          code_verifier: {
            type: 'string',
            description:
              'The `code_verifier` value that you generated when creating the user authorization URL.',
          },
          grant_type: {
            type: 'string',
            description: 'For exchanging an authorization code for an access token.',
            enum: ['authorization_code'],
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
          redirect_uri: {
            type: 'string',
            description:
              'Only required if a redirect URL was supplied when you [created the user authorization URL](https://www.canva.dev/docs/connect/authentication/#create-the-authorization-url).\n\nMust be one of those already specified by the client. If not supplied, the first redirect_uri defined for the client will be used by default.\n',
          },
        },
        required: ['code', 'code_verifier', 'grant_type'],
      },
      {
        type: 'object',
        properties: {
          grant_type: {
            type: 'string',
            description: 'For generating an access token using a refresh token.',
            enum: ['refresh_token'],
          },
          refresh_token: {
            type: 'string',
            description:
              'The refresh token to be exchanged. You can copy this value from the successful response received when generating an access token.',
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
          scope: {
            type: 'string',
            description:
              'Optional scope value when refreshing an access token. Separate multiple [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) with a single space between each scope.\n\nThe requested scope cannot include any permissions not already granted, so this parameter allows you to limit the scope when refreshing a token. If omitted, the scope for the token remains unchanged.\n',
          },
        },
        required: ['grant_type', 'refresh_token'],
      },
    ],
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.createToken(body)));
};

export default { metadata, tool, handler };

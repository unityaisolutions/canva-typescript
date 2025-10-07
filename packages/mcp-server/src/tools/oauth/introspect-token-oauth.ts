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
  httpPath: '/v1/oauth/introspect',
  operationId: 'introspectToken',
};

export const tool: Tool = {
  name: 'introspect_token_oauth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nIntrospect an access token to see whether it is valid and active. You can also verify some token properties, such as its claims, scopes, and validity times.\n\nRequests to this endpoint require authentication with your client ID and client secret, using _one_ of the following methods:\n\n- **Basic access authentication** (Recommended): For [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the `{credentials}` string must be a Base64 encoded value of `{client id}:{client secret}`.\n- **Body parameters**: Provide your integration's credentials using the `client_id` and `client_secret` body parameters.\n\nThis endpoint can't be called from a user's web-browser client because it uses client authentication with client secrets. Requests must come from your integration's backend, otherwise they'll be blocked by Canva's [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Introspection result of access or refresh tokens',\n  properties: {\n    active: {\n      type: 'boolean',\n      description: 'Whether the access token is active.\\n\\nIf `true`, the access token is valid and active. If `false`, the access token is invalid.\\n'\n    },\n    client: {\n      type: 'string',\n      description: 'The ID of the client that requested the token.'\n    },\n    exp: {\n      type: 'integer',\n      description: 'The expiration time of the token, as a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.'\n    },\n    iat: {\n      type: 'integer',\n      description: 'When the token was issued, as a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.'\n    },\n    jti: {\n      type: 'string',\n      description: 'A unique ID for the access token.'\n    },\n    nbf: {\n      type: 'integer',\n      description: 'The \"not before\" time of the token, which specifies the time before which the access token most not be accepted, as a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.'\n    },\n    scope: {\n      type: 'string',\n      description: 'The [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) that the token has been granted.'\n    },\n    sub: {\n      type: 'string',\n      description: 'The subject of the claim. This is the ID of the Canva user that the access token acts on behalf of.\\n\\nThis is an obfuscated value, so a single user has a unique ID for each integration. If the same user authorizes another integration, their ID in that other integration is different.\\n'\n    }\n  },\n  required: [    'active'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'The token to introspect.',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['token'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.oauth.introspectToken(body)));
};

export default { metadata, tool, handler };

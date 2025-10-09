// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'apps',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/apps/{appId}/jwks',
  operationId: 'getAppJwks',
};

export const tool: Tool = {
  name: 'retrieve_jwks_apps',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns the Json Web Key Set (public keys) of an app. These keys are used to\nverify JWTs sent to app backends.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/app_retrieve_jwks_response',\n  $defs: {\n    app_retrieve_jwks_response: {\n      type: 'object',\n      properties: {\n        keys: {\n          type: 'array',\n          description: 'The value of the \"keys\" parameter is an array of JWK values. The order of keys has no\\nmeaning.',\n          items: {\n            type: 'object',\n            description: 'Standard Json Web Key specification following https://www.rfc-editor.org/rfc/rfc7517 and\\nhttps://www.rfc-editor.org/rfc/rfc7518.html.',\n            properties: {\n              e: {\n                type: 'string',\n                description: 'The \"e\" (exponent) parameter contains the exponent value for the RSA\\n   public key.  It is represented as a Base64urlUInt-encoded value.\\nSee https://www.rfc-editor.org/rfc/rfc7518.html#section-6.3'\n              },\n              kid: {\n                type: 'string',\n                description: 'The \"kid\" (key ID) parameter is used to match a specific key.  This\\nis used, for instance, to choose among a set of keys within a JWK Set\\nduring key rollover. When \"kid\" values are used within a JWK Set,\\ndifferent keys within the JWK Set SHOULD use distinct \"kid\" values.\\nThe \"kid\" value is a case-sensitive string.\\nSee https://www.rfc-editor.org/rfc/rfc7517#section-4'\n              },\n              kty: {\n                type: 'string',\n                description: 'The \"kty\" (key type) parameter identifies the cryptographic algorithm\\nfamily used with the key, such as \"RSA\" or \"EC\". The \"kty\" value is a\\ncase-sensitive string. At the moment, only \"RSA\" is supported.\\nSee https://www.rfc-editor.org/rfc/rfc7517#section-4'\n              },\n              n: {\n                type: 'string',\n                description: 'The \"n\" (modulus) parameter contains the modulus value for the RSA\\n   public key.  It is represented as a Base64urlUInt-encoded value.\\nSee https://www.rfc-editor.org/rfc/rfc7518.html#section-6.3'\n              },\n              alg: {\n                type: 'string',\n                description: 'The \"alg\" (algorithm) parameter identifies the algorithm intended for\\nuse with the key.\\nSee https://www.rfc-editor.org/rfc/rfc7517#section-4'\n              },\n              use: {\n                type: 'string',\n                description: 'The \"use\" (public key use) parameter identifies the intended use of\\nthe public key. The \"use\" parameter is employed to indicate whether\\na public key is used for encrypting data or verifying the signature\\non data. Values are commonly \"sig\" (signature) or \"enc\" (encryption).\\nSee https://www.rfc-editor.org/rfc/rfc7517#section-4'\n              }\n            },\n            required: [              'e',\n              'kid',\n              'kty',\n              'n'\n            ]\n          }\n        }\n      },\n      required: [        'keys'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      appId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['appId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { appId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.apps.retrieveJwks(appId)));
};

export default { metadata, tool, handler };

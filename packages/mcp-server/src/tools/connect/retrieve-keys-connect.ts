// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'connect',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/connect/keys',
  operationId: 'getSigningPublicKeys',
};

export const tool: Tool = {
  name: 'retrieve_keys_connect',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nThe Keys API (`connect/keys`) is a security measure you can use to verify the authenticity\nof webhooks you receive from Canva Connect. The Keys API returns a\n[JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517#section-2), which you can use to\ndecrypt the webhook signature and verify it came from Canva and not a potentially malicious\nactor. This helps to protect your systems from\n[Replay attacks](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/).\n\nThe keys returned by the Keys API can rotate. We recommend you cache the keys you receive\nfrom this API where possible, and only access this API when you receive a webhook signed\nwith an unrecognized key. This allows you to verify webhooks quicker than accessing this API\nevery time you receive a webhook.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/connect_retrieve_keys_response',\n  $defs: {\n    connect_retrieve_keys_response: {\n      type: 'object',\n      properties: {\n        keys: {\n          type: 'array',\n          description: 'A Json Web Key Set (JWKS) with public keys used for signing webhooks. You can use this JWKS\\nto verify that a webhook was sent from Canva.',\n          items: {\n            type: 'object',\n            description: 'A JSON Web Key Set (JWKS) using the Edwards-curve Digital Signature Algorithm (EdDSA), as\\ndescribed in [RFC-8037](https://www.rfc-editor.org/rfc/rfc8037.html#appendix-A).',\n            properties: {\n              crv: {\n                type: 'string',\n                description: 'The `crv` (curve) property identifies the curve used for elliptical curve\\nencryptions. Only \"Ed25519\" is supported. For more information on the `crv`\\nproperty, see [RFC-8037 — Key Type\\n\"OKP\"](https://www.rfc-editor.org/rfc/rfc8037.html#section-2).'\n              },\n              kid: {\n                type: 'string',\n                description: 'The `kid` (key ID) is a unique identifier for a public key. When the keys used\\nto sign webhooks are rotated, you can use this ID to select the correct key\\nwithin a JWK Set during the key rollover. The `kid` value is case-sensitive.'\n              },\n              kty: {\n                type: 'string',\n                description: 'The `kty` (key type) identifies the cryptographic algorithm family used with\\nthe key, such as \"RSA\" or \"EC\". Only Octet Key Pairs\\n(`OKPs`) are supported.\\nThe `kty` value is case-sensitive. For more information on the `kty` property\\nand OKPs, see [RFC-8037 — \"kty\" (Key Type)\\nParameter](https://www.rfc-editor.org/rfc/rfc8037.html#section-2).'\n              },\n              x: {\n                type: 'string',\n                description: 'The `x` property is the public key of an elliptical curve encryption. The key\\nis Base64urlUInt-encoded. For more information on the `x` property, see\\n[RFC-8037 — \"x\" (X Coordinate)\\nParameter](https://www.rfc-editor.org/rfc/rfc8037#section-2).'\n              }\n            },\n            required: [              'crv',\n              'kid',\n              'kty',\n              'x'\n            ]\n          }\n        }\n      },\n      required: [        'keys'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.connect.retrieveKeys()));
};

export default { metadata, tool, handler };

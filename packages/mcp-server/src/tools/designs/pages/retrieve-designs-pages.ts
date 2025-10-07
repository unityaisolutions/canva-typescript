// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.pages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/designs/{designId}/pages',
  operationId: 'getDesignPages',
};

export const tool: Tool = {
  name: 'retrieve_designs_pages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nLists metadata for pages in a design, such as page-specific thumbnails.\n\nFor the specified design, you can provide `offset` and `limit` values to specify the range of pages to return.\n\nNOTE: Some design types don't have pages (for example, Canva docs).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Successful response from a `getDesignPages` request.',\n  properties: {\n    items: {\n      type: 'array',\n      description: 'The list of pages.',\n      items: {\n        type: 'object',\n        description: 'Basic details about a page in a design, such as the page\\'s index and thumbnail.',\n        properties: {\n          index: {\n            type: 'integer',\n            description: 'The index of the page in the design. The first page in a design has the index value `1`.'\n          },\n          thumbnail: {\n            $ref: '#/$defs/thumbnail'\n          }\n        },\n        required: [          'index'\n        ]\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      limit: {
        type: 'integer',
        description:
          'The number of pages to return, starting at the page index specified using the `offset` parameter.',
      },
      offset: {
        type: 'integer',
        description:
          'The page index to start the range of pages to return.\n\nPages are indexed using one-based numbering, so the first page in a design has the index value `1`.\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['designId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { designId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.designs.pages.retrieve(designId, body)),
  );
};

export default { metadata, tool, handler };

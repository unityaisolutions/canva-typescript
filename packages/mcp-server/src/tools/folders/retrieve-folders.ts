// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/folders/{folderId}',
  operationId: 'getFolder',
};

export const tool: Tool = {
  name: 'retrieve_folders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGets the name and other details of a folder using a folder's `folderID`.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'The folder ID.',\n  properties: {\n    folder: {\n      $ref: '#/$defs/folder'\n    }\n  },\n  required: [    'folder'\n  ],\n  $defs: {\n    folder: {\n      type: 'object',\n      description: 'The folder object, which contains metadata about the folder.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The folder ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the folder was created, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        name: {\n          type: 'string',\n          description: 'The folder name.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the folder was last updated, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'updated_at'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      folderId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['folderId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { folderId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.folders.retrieve(folderId)));
};

export default { metadata, tool, handler };

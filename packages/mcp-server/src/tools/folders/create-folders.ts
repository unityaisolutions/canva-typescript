// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/folders',
  operationId: 'createFolder',
};

export const tool: Tool = {
  name: 'create_folders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a folder in one of the following locations:\n\n- The top level of a Canva user's [projects](https://www.canva.com/help/find-designs-and-folders/) (using the ID `root`),\n- The user's Uploads folder (using the ID `uploads`),\n- Another folder (using the parent folder's ID).\n\nWhen a folder is successfully created, the\nendpoint returns its folder ID, along with other information.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/folder_create_response',\n  $defs: {\n    folder_create_response: {\n      type: 'object',\n      description: 'Details about the new folder.',\n      properties: {\n        folder: {\n          $ref: '#/$defs/folder'\n        }\n      }\n    },\n    folder: {\n      type: 'object',\n      description: 'The folder object, which contains metadata about the folder.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The folder ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the folder was created, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        name: {\n          type: 'string',\n          description: 'The folder name.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the folder was last updated, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'updated_at'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the folder.',
      },
      parent_folder_id: {
        type: 'string',
        description:
          "The folder ID of the parent folder. To create a new folder at the top level of a user's\n[projects](https://www.canva.com/help/find-designs-and-folders/), use the ID `root`.\nTo create it in their Uploads folder, use `uploads`.",
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['name', 'parent_folder_id'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.folders.create(body)));
};

export default { metadata, tool, handler };

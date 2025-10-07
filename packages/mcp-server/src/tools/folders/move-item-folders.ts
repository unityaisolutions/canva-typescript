// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/folders/move',
  operationId: 'moveFolderItem',
};

export const tool: Tool = {
  name: 'move_item_folders',
  description:
    'Moves an item to another folder. You must specify the folder ID of the destination folder, as well as the ID of the item you want to move.\n\nNOTE: In some situations, a single item can exist in multiple folders. If you attempt to move an item that exists in multiple folders, the API returns an `item_in_multiple_folders` error. In this case, you must use the Canva UI to move the item to another folder.',
  inputSchema: {
    type: 'object',
    properties: {
      item_id: {
        type: 'string',
        description: 'The ID of the item you want to move. Currently, video assets are not supported.',
      },
      to_folder_id: {
        type: 'string',
        description:
          "The ID of the folder you want to move the item to (the destination folder).\nIf you want to move the item to the top level of a Canva user's\n[projects](https://www.canva.com/help/find-designs-and-folders/), use the ID `root`.",
      },
    },
    required: ['item_id', 'to_folder_id'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.folders.moveItem(body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

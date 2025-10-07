// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/folders/{folderId}',
  operationId: 'deleteFolder',
};

export const tool: Tool = {
  name: 'delete_folders',
  description:
    "Deletes a folder with the specified `folderID`.\nDeleting a folder moves the user's content in the folder to the\n[Trash](https://www.canva.com/help/deleted-designs/) and content owned by\nother users is moved to the top level of the owner's\n[projects](https://www.canva.com/help/find-designs-and-folders/).",
  inputSchema: {
    type: 'object',
    properties: {
      folderId: {
        type: 'string',
      },
    },
    required: ['folderId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { folderId, ...body } = args as any;
  const response = await client.folders.delete(folderId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

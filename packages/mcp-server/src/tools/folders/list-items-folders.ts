// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'folders',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/folders/{folderId}/items',
  operationId: 'listFolderItems',
};

export const tool: Tool = {
  name: 'list_items_folders',
  description:
    "Lists the items in a folder, including each item's `type`.\n\nFolders can contain:\n\n- Other folders.\n- Designs, such as Instagram posts, Presentations, and Documents ([Canva Docs](https://www.canva.com/create/documents/)).\n- Image assets.\n\nCurrently, video assets are not returned in the response.",
  inputSchema: {
    type: 'object',
    properties: {
      folderId: {
        type: 'string',
      },
      continuation: {
        type: 'string',
        description:
          'If the success response contains a continuation token, the folder contains more items\nyou can list. You can use this token as a query parameter and retrieve more\nitems from the list, for example\n`/v1/folders/{folderId}/items?continuation={continuation}`.\n\nTo retrieve all the items in a folder, you might need to make multiple requests.',
      },
      item_types: {
        type: 'array',
        description:
          'Filter the folder items to only return specified types. The available types are:\n`design`, `folder`, and `image`. To filter for more than one item type, provide a comma-\ndelimited list.',
        items: {
          type: 'string',
          enum: ['design', 'folder', 'image'],
        },
      },
      sort_by: {
        type: 'string',
        description:
          'Sort the list of folder items.\n\n- `created_ascending` - Sort results by creation date, in ascending order.\n- `created_descending` - Sort results by creation date, in descending order.\n- `modified_ascending` - Sort results by the last modified date, in ascending order.\n- `modified_descending` - Sort results by the last modified date, in descending order.\n- `title_ascending` - Sort results by title, in ascending order. The title is either the `name` field for a folder or asset, or the `title` field for a design.\n- `title_descending` - Sort results by title, in descending order. The title is either the `name` field for a folder or asset, or the `title` field for a design.',
        enum: [
          'created_ascending',
          'created_descending',
          'modified_ascending',
          'modified_descending',
          'title_ascending',
          'title_descending',
        ],
      },
    },
    required: ['folderId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { folderId, ...body } = args as any;
  return asTextContentResult(await client.folders.listItems(folderId, body));
};

export default { metadata, tool, handler };

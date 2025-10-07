// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/designs',
  operationId: 'listDesigns',
};

export const tool: Tool = {
  name: 'list_designs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists metadata for all the designs in a Canva user's\n[projects](https://www.canva.com/help/find-designs-and-folders/). You can also:\n\n- Use search terms to filter the listed designs.\n- Show designs either created by, or shared with the user.\n- Sort the results.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      description: 'The list of designs.',\n      items: {\n        $ref: '#/$defs/design'\n      }\n    },\n    continuation: {\n      type: 'string',\n      description: 'A continuation token.\\nIf the success response contains a continuation token, the list contains more designs\\nyou can list. You can use this token as a query parameter and retrieve more\\ndesigns from the list, for example\\n`/v1/designs?continuation={continuation}`.\\n\\nTo retrieve all of a user\\'s designs, you might need to make multiple requests.'\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    design: {\n      type: 'object',\n      description: 'The design object, which contains metadata about the design.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the design was created in Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        owner: {\n          $ref: '#/$defs/team_user_summary'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the design was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        urls: {\n          $ref: '#/$defs/design_links'\n        },\n        page_count: {\n          type: 'integer',\n          description: 'The total number of pages in the design. Some design types don\\'t have pages (for example, Canva docs).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        },\n        title: {\n          type: 'string',\n          description: 'The design title.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'owner',\n        'updated_at',\n        'urls'\n      ]\n    },\n    team_user_summary: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and Team ID.',\n      properties: {\n        team_id: {\n          type: 'string',\n          description: 'The ID of the user\\'s Canva Team.'\n        },\n        user_id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        }\n      },\n      required: [        'team_id',\n        'user_id'\n      ]\n    },\n    design_links: {\n      type: 'object',\n      description: 'A temporary set of URLs for viewing or editing the design.',\n      properties: {\n        edit_url: {\n          type: 'string',\n          description: 'A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.\\n'\n        }\n      },\n      required: [        'edit_url',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      continuation: {
        type: 'string',
        description:
          "If the success response contains a continuation token, the list contains more designs\nyou can list. You can use this token as a query parameter and retrieve more\ndesigns from the list, for example\n`/v1/designs?continuation={continuation}`.\n\nTo retrieve all of a user's designs, you might need to make multiple requests.",
      },
      ownership: {
        $ref: '#/$defs/ownership_type',
      },
      query: {
        type: 'string',
        description:
          "Lets you search the user's designs, and designs shared with the user, using a search term or terms.",
      },
      sort_by: {
        $ref: '#/$defs/sort_by_type',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
    $defs: {
      ownership_type: {
        type: 'string',
        description:
          '- `any` - Owned by and shared with the user.\n- `owned` - Owned by the user.\n- `shared` - Shared with the user.',
        enum: ['any', 'owned', 'shared'],
      },
      sort_by_type: {
        type: 'string',
        description:
          '- `relevance` - Sort results using a relevance algorithm.\n- `modified_descending` - Sort results by the date last modified in descending order.\n- `modified_ascending` - Sort results by the date last modified in ascending order.\n- `title_descending` - Sort results by title in descending order.\n- `title_ascending` - Sort results by title in ascending order',
        enum: [
          'relevance',
          'modified_descending',
          'modified_ascending',
          'title_descending',
          'title_ascending',
        ],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.designs.list(body)));
};

export default { metadata, tool, handler };

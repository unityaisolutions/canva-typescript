// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'users.me',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/users/me',
  operationId: 'usersMe',
};

export const tool: Tool = {
  name: 'retrieve_users_me',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReturns the User ID and Team ID of the user\naccount associated with the provided access token.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    team_user: {\n      $ref: '#/$defs/team_user_summary'\n    }\n  },\n  required: [    'team_user'\n  ],\n  $defs: {\n    team_user_summary: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and Team ID.',\n      properties: {\n        team_id: {\n          type: 'string',\n          description: 'The ID of the user\\'s Canva Team.'\n        },\n        user_id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        }\n      },\n      required: [        'team_id',\n        'user_id'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.users.me.retrieve()));
};

export default { metadata, tool, handler };

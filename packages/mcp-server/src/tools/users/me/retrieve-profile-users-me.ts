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
  httpPath: '/v1/users/me/profile',
  operationId: 'getUserProfile',
};

export const tool: Tool = {
  name: 'retrieve_profile_users_me',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCurrently, this returns the display name of the user account associated with the provided access token. More user information is expected to be included in the future.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    profile: {\n      type: 'object',\n      description: 'Profile for the user, consisting of the display name and other attributes.',\n      properties: {\n        display_name: {\n          type: 'string',\n          description: 'The name of the user as shown in the Canva UI.'\n        }\n      }\n    }\n  },\n  required: [    'profile'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.users.me.retrieveProfile()));
};

export default { metadata, tool, handler };

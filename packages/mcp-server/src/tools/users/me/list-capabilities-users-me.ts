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
  httpPath: '/v1/users/me/capabilities',
  operationId: 'getUserCapabilities',
};

export const tool: Tool = {
  name: 'list_capabilities_users_me',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLists the API capabilities for the user account associated with the provided access token. For more information, see [Capabilities](https://www.canva.dev/docs/connect/capabilities/).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    capabilities: {\n      type: 'array',\n      items: {\n        type: 'string',\n        description: 'Some APIs are annotated with required capabilities. These endpoints require the user to\\npossess the required capabilities in order to be called successfully.\\n\\n- `autofill` - Capability required to call autofill APIs Users that are members of a [Canva Enterprise](https://www.canva.com/enterprise/) organization have this capability.\\n- `brand_template` - Capability required to use brand template APIs. Users that are members of a [Canva Enterprise](https://www.canva.com/enterprise/) organization have this capability.\\n- `resize` - Capability required to create design resize jobs. Users on a Canva plan with premium features (such as Canva Pro) have this capability.',\n        enum: [          'autofill',\n          'brand_template',\n          'resize'\n        ]\n      }\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.users.me.listCapabilities()));
};

export default { metadata, tool, handler };

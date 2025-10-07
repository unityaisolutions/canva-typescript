// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.comments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/designs/{designId}/comments/{threadId}',
  operationId: 'getThread',
};

export const tool: Tool = {
  name: 'retrieve_designs_comments',
  description:
    "<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nGets a comment or suggestion thread on a design.\nTo retrieve a reply to a comment thread, use the [Get reply](https://www.canva.dev/docs/connect/api-reference/comments/get-reply/) API.\nFor information on comments and how they're used in the Canva UI, see the\n[Canva Help Center](https://www.canva.com/help/comments/).",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      threadId: {
        type: 'string',
      },
    },
    required: ['designId', 'threadId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { threadId, ...body } = args as any;
  return asTextContentResult(await client.designs.comments.retrieve(threadId, body));
};

export default { metadata, tool, handler };

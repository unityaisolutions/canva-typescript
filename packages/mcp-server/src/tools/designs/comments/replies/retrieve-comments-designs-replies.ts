// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.comments.replies',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/designs/{designId}/comments/{threadId}/replies/{replyId}',
  operationId: 'getReply',
};

export const tool: Tool = {
  name: 'retrieve_comments_designs_replies',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nGets a reply to a comment or suggestion thread on a design.\nFor information on comments and how they're used in the Canva UI, see the\n[Canva Help Center](https://www.canva.com/help/comments/).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/reply_retrieve_response',\n  $defs: {\n    reply_retrieve_response: {\n      type: 'object',\n      description: 'Successful response from a `getReply` request.',\n      properties: {\n        reply: {\n          $ref: '#/$defs/reply'\n        }\n      },\n      required: [        'reply'\n      ]\n    },\n    reply: {\n      type: 'object',\n      description: 'A reply to a thread.\\n\\nThe `author` of the reply might be missing if that user account no longer exists.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the reply.'\n        },\n        content: {\n          $ref: '#/$defs/comment_content'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the reply was created, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        design_id: {\n          type: 'string',\n          description: 'The ID of the design that the thread for this reply is attached to.'\n        },\n        mentions: {\n          type: 'object',\n          description: 'The Canva users mentioned in the comment thread or reply.',\n          additionalProperties: true\n        },\n        thread_id: {\n          type: 'string',\n          description: 'The ID of the thread this reply is in.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the reply was last updated, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        author: {\n          $ref: '#/$defs/user'\n        }\n      },\n      required: [        'id',\n        'content',\n        'created_at',\n        'design_id',\n        'mentions',\n        'thread_id',\n        'updated_at'\n      ]\n    },\n    comment_content: {\n      type: 'object',\n      description: 'The content of a comment thread or reply.',\n      properties: {\n        plaintext: {\n          type: 'string',\n          description: 'The content in plaintext.\\nAny user mention tags are shown in the format `[user_id:team_id]`.'\n        },\n        markdown: {\n          type: 'string',\n          description: 'The content in markdown.\\nAny user mention tags are shown in the format `[user_id:team_id]`'\n        }\n      },\n      required: [        'plaintext'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and display name.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name of the user as shown in the Canva UI.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      threadId: {
        type: 'string',
      },
      replyId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['designId', 'threadId', 'replyId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { replyId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.designs.comments.replies.retrieve(replyId, body)),
  );
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.comments.replies',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/designs/{designId}/comments/{threadId}/replies',
  operationId: 'createReply',
};

export const tool: Tool = {
  name: 'create_comments_designs_replies',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nCreates a reply to a comment or suggestion thread on a design.\nTo reply to an existing thread, you must provide the ID of the thread\nwhich is returned when a thread is created, or from the `thread_id` value\nof an existing reply in the thread. Each thread can\nhave a maximum of 100 replies created for it.\n\nFor information on comments and how they're used in the Canva UI, see the\n[Canva Help Center](https://www.canva.com/help/comments/).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    reply: {\n      $ref: '#/$defs/reply'\n    }\n  },\n  required: [    'reply'\n  ],\n  $defs: {\n    reply: {\n      type: 'object',\n      description: 'A reply to a thread.\\n\\nThe `author` of the reply might be missing if that user account no longer exists.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the reply.'\n        },\n        content: {\n          $ref: '#/$defs/comment_content'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the reply was created, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        design_id: {\n          type: 'string',\n          description: 'The ID of the design that the thread for this reply is attached to.'\n        },\n        mentions: {\n          type: 'object',\n          description: 'The Canva users mentioned in the comment thread or reply.',\n          additionalProperties: true\n        },\n        thread_id: {\n          type: 'string',\n          description: 'The ID of the thread this reply is in.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the reply was last updated, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        author: {\n          $ref: '#/$defs/user'\n        }\n      },\n      required: [        'id',\n        'content',\n        'created_at',\n        'design_id',\n        'mentions',\n        'thread_id',\n        'updated_at'\n      ]\n    },\n    comment_content: {\n      type: 'object',\n      description: 'The content of a comment thread or reply.',\n      properties: {\n        plaintext: {\n          type: 'string',\n          description: 'The content in plaintext.\\nAny user mention tags are shown in the format `[user_id:team_id]`.'\n        },\n        markdown: {\n          type: 'string',\n          description: 'The content in markdown.\\nAny user mention tags are shown in the format `[user_id:team_id]`'\n        }\n      },\n      required: [        'plaintext'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and display name.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name of the user as shown in the Canva UI.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      threadId: {
        type: 'string',
      },
      message_plaintext: {
        type: 'string',
        description:
          'The comment message of the reply in plaintext. This is the reply comment shown in the Canva UI.\n\nYou can also mention users in your message by specifying their User ID and Team ID\nusing the format `[user_id:team_id]`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['designId', 'threadId', 'message_plaintext'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { threadId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.designs.comments.replies.create(threadId, body)),
  );
};

export default { metadata, tool, handler };

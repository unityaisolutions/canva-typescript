// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'comments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/comments/{commentId}/replies',
  operationId: 'createReplyDeprecated',
};

export const tool: Tool = {
  name: 'create_reply_comments',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is deprecated, so you should use the [Create reply](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/) API instead.\n\n</Warning>\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nCreates a reply to a comment in a design.\nTo reply to an existing thread of comments, you can use either the `id` of the parent\n(original) comment, or the `thread_id` of a comment in the thread. Each comment can\nhave a maximum of 100 replies created for it.\n\nFor information on comments and how they're used in the Canva UI, see the\n[Canva Help Center](https://www.canva.com/help/comments/).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    comment: {\n      $ref: '#/$defs/reply_comment'\n    }\n  },\n  required: [    'comment'\n  ],\n  $defs: {\n    reply_comment: {\n      type: 'object',\n      description: 'Data about the reply comment, including the message, author, and\\nthe object (such as a design) the comment is attached to.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the comment.'\n        },\n        author: {\n          $ref: '#/$defs/user'\n        },\n        mentions: {\n          type: 'object',\n          description: 'The Canva users mentioned in the comment.',\n          additionalProperties: true\n        },\n        message: {\n          type: 'string',\n          description: 'The comment message. This is the comment body shown in the Canva UI.\\nUser mentions are shown here in the format `[user_id:team_id]`.'\n        },\n        thread_id: {\n          type: 'string',\n          description: 'The ID of the comment thread this reply is in. This ID is the same as the `id` of the\\nparent comment.'\n        },\n        type: {\n          type: 'string',\n          enum: [            'reply'\n          ]\n        },\n        attached_to: {\n          $ref: '#/$defs/comment_object'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the comment or reply was created, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the comment or reply was last updated, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        }\n      },\n      required: [        'id',\n        'author',\n        'mentions',\n        'message',\n        'thread_id',\n        'type'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and display name.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name of the user as shown in the Canva UI.'\n        }\n      },\n      required: [        'id'\n      ]\n    },\n    comment_object: {\n      type: 'object',\n      description: 'If the comment is attached to a Canva Design.',\n      properties: {\n        design_id: {\n          type: 'string',\n          description: 'The ID of the design this comment is attached to.'\n        },\n        type: {\n          type: 'string',\n          enum: [            'design'\n          ]\n        }\n      },\n      required: [        'design_id',\n        'type'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      commentId: {
        type: 'string',
      },
      attached_to: {
        $ref: '#/$defs/comment_object_input',
      },
      message: {
        type: 'string',
        description:
          'The reply comment message. This is the reply comment body shown in the Canva UI.\n\nYou can also mention users in your message by specifying their User ID and Team ID\nusing the format `[user_id:team_id]`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['commentId', 'attached_to', 'message'],
    $defs: {
      comment_object_input: {
        type: 'object',
        description: 'If the comment is attached to a Canva Design.',
        properties: {
          design_id: {
            type: 'string',
            description: 'The ID of the design you want to attach this comment to.',
          },
          type: {
            type: 'string',
            enum: ['design'],
          },
        },
        required: ['design_id', 'type'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { commentId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.comments.createReply(commentId, body)),
  );
};

export default { metadata, tool, handler };

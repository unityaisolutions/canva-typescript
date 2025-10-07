// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.comments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/designs/{designId}/comments',
  operationId: 'createThread',
};

export const tool: Tool = {
  name: 'create_designs_comments',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\nThis API is currently provided as a preview. Be aware of the following:\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n</Warning>\n\nCreates a new comment thread on a design.\nFor information on comments and how they're used in the Canva UI, see the\n[Canva Help Center](https://www.canva.com/help/comments/).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    thread: {\n      $ref: '#/$defs/thread'\n    }\n  },\n  required: [    'thread'\n  ],\n  $defs: {\n    thread: {\n      type: 'object',\n      description: 'A discussion thread on a design.\\n\\nThe `type` of the thread can be found in the `thread_type` object, along with additional type-specific properties.\\nThe `author` of the thread might be missing if that user account no longer exists.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the thread.\\n\\nYou can use this ID to create replies to the thread using the [Create reply API](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/).'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the thread was created, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        design_id: {\n          type: 'string',\n          description: 'The ID of the design that the discussion thread is on.'\n        },\n        thread_type: {\n          anyOf: [            {\n              type: 'object',\n              description: 'A comment thread.',\n              properties: {\n                content: {\n                  $ref: '#/$defs/comment_content'\n                },\n                mentions: {\n                  type: 'object',\n                  description: 'The Canva users mentioned in the comment thread or reply.',\n                  additionalProperties: true\n                },\n                type: {\n                  type: 'string',\n                  enum: [                    'comment'\n                  ]\n                },\n                assignee: {\n                  $ref: '#/$defs/user'\n                },\n                resolver: {\n                  $ref: '#/$defs/user'\n                }\n              },\n              required: [                'content',\n                'mentions',\n                'type'\n              ]\n            },\n            {\n              type: 'object',\n              description: 'A suggestion thread.',\n              properties: {\n                status: {\n                  type: 'string',\n                  description: 'The current status of the suggestion.\\n\\n- `open` - A suggestion was made, but it hasn\\'t been accepted or rejected yet.\\n- `accepted` - A suggestion was accepted and applied to the design.\\n- `rejected` - A suggestion was rejected and not applied to the design.',\n                  enum: [                    'open',\n                    'accepted',\n                    'rejected'\n                  ]\n                },\n                suggested_edits: {\n                  type: 'array',\n                  items: {\n                    anyOf: [                      {\n                        type: 'object',\n                        description: 'A suggestion to add some text.',\n                        properties: {\n                          text: {\n                            type: 'string'\n                          },\n                          type: {\n                            type: 'string',\n                            enum: [                              'add'\n                            ]\n                          }\n                        },\n                        required: [                          'text',\n                          'type'\n                        ]\n                      },\n                      {\n                        type: 'object',\n                        description: 'A suggestion to delete some text.',\n                        properties: {\n                          text: {\n                            type: 'string'\n                          },\n                          type: {\n                            type: 'string',\n                            enum: [                              'delete'\n                            ]\n                          }\n                        },\n                        required: [                          'text',\n                          'type'\n                        ]\n                      },\n                      {\n                        type: 'object',\n                        description: 'A suggestion to format some text.',\n                        properties: {\n                          format: {\n                            type: 'string',\n                            description: 'The suggested format change.',\n                            enum: [                              'font_family',\n                              'font_size',\n                              'font_weight',\n                              'font_style',\n                              'color',\n                              'background_color',\n                              'decoration',\n                              'strikethrough',\n                              'link',\n                              'letter_spacing',\n                              'line_height',\n                              'direction',\n                              'text_align',\n                              'list_marker',\n                              'list_level',\n                              'margin_inline_start',\n                              'text_indent',\n                              'font_size_modifier',\n                              'vertical_align'\n                            ]\n                          },\n                          type: {\n                            type: 'string',\n                            enum: [                              'format'\n                            ]\n                          }\n                        },\n                        required: [                          'format',\n                          'type'\n                        ]\n                      }\n                    ],\n                    description: 'The type of the suggested edit, along with additional type-specific properties.'\n                  }\n                },\n                type: {\n                  type: 'string',\n                  enum: [                    'suggestion'\n                  ]\n                }\n              },\n              required: [                'status',\n                'suggested_edits',\n                'type'\n              ]\n            }\n          ],\n          description: 'The type of the discussion thread, along with additional type-specific properties.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the thread was last updated, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        author: {\n          $ref: '#/$defs/user'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'design_id',\n        'thread_type',\n        'updated_at'\n      ]\n    },\n    comment_content: {\n      type: 'object',\n      description: 'The content of a comment thread or reply.',\n      properties: {\n        plaintext: {\n          type: 'string',\n          description: 'The content in plaintext.\\nAny user mention tags are shown in the format `[user_id:team_id]`.'\n        },\n        markdown: {\n          type: 'string',\n          description: 'The content in markdown.\\nAny user mention tags are shown in the format `[user_id:team_id]`'\n        }\n      },\n      required: [        'plaintext'\n      ]\n    },\n    user: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and display name.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        },\n        display_name: {\n          type: 'string',\n          description: 'The name of the user as shown in the Canva UI.'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      message_plaintext: {
        type: 'string',
        description:
          'The comment message in plaintext. This is the comment body shown in the Canva UI.\n\nYou can also mention users in your message by specifying their User ID and Team ID\nusing the format `[user_id:team_id]`. If the `assignee_id` parameter is specified, you\nmust mention the assignee in the message.',
      },
      assignee_id: {
        type: 'string',
        description:
          'Lets you assign the comment to a Canva user using their User ID. You _must_ mention the\nassigned user in the `message`.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['designId', 'message_plaintext'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { designId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.designs.comments.create(designId, body)),
  );
};

export default { metadata, tool, handler };

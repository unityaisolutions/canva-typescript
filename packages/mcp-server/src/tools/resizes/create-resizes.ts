// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'resizes',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/resizes',
  operationId: 'createDesignResizeJob',
};

export const tool: Tool = {
  name: 'create_resizes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Note>\n\nTo use this API, your integration must act on behalf of a user that's on a Canva plan with premium features (such as Canva Pro).\n\n</Note>\n\nStarts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)\nto create a resized copy of a design. The new resized design is\nadded to the top level of the user's\n[projects](https://www.canva.com/help/find-designs-and-folders/) (`root` folder).\n\nTo resize a design into a new design, you can either:\n\n  - Use a preset design type.\n  - Set height and width dimensions for a custom design.\n\nNote the following behaviors and restrictions when resizing designs:\n- Designs can be resized to a maximum area of 25,000,000 pixels squared.\n- Resizing designs using the Connect API always creates a new design. In-place resizing is currently not available in the Connect API, but can be done in the Canva UI.\n- Resizing a multi-page design results in all pages of the design being resized. Resizing a section of a design is only available in the Canva UI.\n- [Canva docs](https://www.canva.com/create/documents/) can't be resized, and other design types can't be resized to a Canva doc.\n- Canva Code designs can't be resized, and other design types can't be resized to a Canva Code design.\n\n<Note>\nFor more information on the workflow for using asynchronous jobs,\nsee [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).\nYou can check the status and get the results of resize jobs created with this API using the\n[Get design resize job API](https://www.canva.dev/docs/connect/api-reference/resizes/get-design-resize-job/).\n</Note>\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    job: {\n      $ref: '#/$defs/design_resize_job'\n    }\n  },\n  required: [    'job'\n  ],\n  $defs: {\n    design_resize_job: {\n      type: 'object',\n      description: 'Details about the design resize job.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design resize job ID.'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the design resize job.',\n          enum: [            'in_progress',\n            'success',\n            'failed'\n          ]\n        },\n        error: {\n          type: 'object',\n          description: 'If the design resize job fails, this object provides details about the error.',\n          properties: {\n            code: {\n              type: 'string',\n              enum: [                'thumbnail_generation_error',\n                'design_resize_error',\n                'create_design_error',\n                'trial_quota_exceeded'\n              ]\n            },\n            message: {\n              type: 'string',\n              description: 'A human-readable description of what went wrong.'\n            }\n          },\n          required: [            'code',\n            'message'\n          ]\n        },\n        result: {\n          type: 'object',\n          description: 'Design has been created and saved to user\\'s root\\n([projects](https://www.canva.com/help/find-designs-and-folders/)) folder.',\n          properties: {\n            design: {\n              $ref: '#/$defs/design_summary'\n            }\n          },\n          required: [            'design'\n          ]\n        }\n      },\n      required: [        'id',\n        'status'\n      ]\n    },\n    design_summary: {\n      type: 'object',\n      description: 'Basic details about the design, such as the design\\'s ID, title, and URL.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the design was created in Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the design was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        urls: {\n          $ref: '#/$defs/design_links'\n        },\n        page_count: {\n          type: 'integer',\n          description: 'The total number of pages in the design. Some design types don\\'t have pages (for example, Canva docs).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        },\n        title: {\n          type: 'string',\n          description: 'The design title.'\n        },\n        url: {\n          type: 'string',\n          description: 'URL of the design.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'updated_at',\n        'urls'\n      ]\n    },\n    design_links: {\n      type: 'object',\n      description: 'A temporary set of URLs for viewing or editing the design.',\n      properties: {\n        edit_url: {\n          type: 'string',\n          description: 'A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.\\n'\n        }\n      },\n      required: [        'edit_url',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      design_id: {
        type: 'string',
        description: 'The design ID.',
      },
      design_type: {
        $ref: '#/$defs/design_type_input',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['design_id', 'design_type'],
    $defs: {
      design_type_input: {
        anyOf: [
          {
            $ref: '#/$defs/preset_design_type_input',
          },
          {
            $ref: '#/$defs/custom_design_type_input',
          },
        ],
        description: 'The desired design type.',
      },
      preset_design_type_input: {
        type: 'object',
        description: 'Provide the common design type.',
        properties: {
          name: {
            type: 'string',
            description:
              "The name of the design type.\n\n- `doc` - A [Canva doc](https://www.canva.com/docs/); a document for Canva's online text editor.\n- `whiteboard` - A [whiteboard](https://www.canva.com/online-whiteboard/); a design which gives you infinite space to collaborate.\n- `presentation` - A [presentation](https://www.canva.com/presentations/); lets you create and collaborate for presenting to an audience.",
            enum: ['doc', 'whiteboard', 'presentation'],
          },
          type: {
            type: 'string',
            enum: ['preset'],
          },
        },
        required: ['name', 'type'],
      },
      custom_design_type_input: {
        type: 'object',
        description: 'Provide the width and height to define a custom design type.',
        properties: {
          height: {
            type: 'integer',
            description: 'The height of the design, in pixels.',
          },
          type: {
            type: 'string',
            enum: ['custom'],
          },
          width: {
            type: 'integer',
            description: 'The width of the design, in pixels.',
          },
        },
        required: ['height', 'type', 'width'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.resizes.create(body)));
};

export default { metadata, tool, handler };

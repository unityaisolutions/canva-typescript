// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'autofills',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/autofills',
  operationId: 'createDesignAutofillJob',
};

export const tool: Tool = {
  name: 'create_autofills',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nSoon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.\n\n</Warning>\n\n<Note>\n\nTo use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.\n\n</Note>\n\nStarts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to autofill a Canva design using a brand template and input data.\n\nTo get a list of input data fields, use the [Get brand template dataset\nAPI](https://www.canva.dev/docs/connect/api-reference/brand-templates/get-brand-template-dataset/).\n\nAvailable data field types to autofill include:\n\n- Images\n- Text\n- Charts\n\n  WARNING: Chart data fields are a [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might be unannounced breaking changes to this feature which won't produce a new API version.\n\n<Note>\n\nFor more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of autofill jobs created with this API using the [Get design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/get-design-autofill-job/).\n\n</Note>\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/autofill_create_response',\n  $defs: {\n    autofill_create_response: {\n      type: 'object',\n      properties: {\n        job: {\n          $ref: '#/$defs/design_autofill_job'\n        }\n      },\n      required: [        'job'\n      ]\n    },\n    design_autofill_job: {\n      type: 'object',\n      description: 'Details about the autofill job.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'ID of the asynchronous job that is creating the design using the provided data.'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the design autofill job.',\n          enum: [            'in_progress',\n            'success',\n            'failed'\n          ]\n        },\n        error: {\n          type: 'object',\n          description: 'If the autofill job fails, this object provides details about the error.',\n          properties: {\n            code: {\n              type: 'string',\n              enum: [                'autofill_error',\n                'thumbnail_generation_error',\n                'create_design_error'\n              ]\n            },\n            message: {\n              type: 'string',\n              description: 'A human-readable description of what went wrong.'\n            }\n          },\n          required: [            'code',\n            'message'\n          ]\n        },\n        result: {\n          type: 'object',\n          description: 'Design has been created and saved to user\\'s root folder.',\n          properties: {\n            design: {\n              $ref: '#/$defs/design_summary'\n            },\n            type: {\n              type: 'string',\n              enum: [                'create_design'\n              ]\n            }\n          },\n          required: [            'design',\n            'type'\n          ]\n        }\n      },\n      required: [        'id',\n        'status'\n      ]\n    },\n    design_summary: {\n      type: 'object',\n      description: 'Basic details about the design, such as the design\\'s ID, title, and URL.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the design was created in Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the design was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        urls: {\n          $ref: '#/$defs/design_links'\n        },\n        page_count: {\n          type: 'integer',\n          description: 'The total number of pages in the design. Some design types don\\'t have pages (for example, Canva docs).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        },\n        title: {\n          type: 'string',\n          description: 'The design title.'\n        },\n        url: {\n          type: 'string',\n          description: 'URL of the design.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'updated_at',\n        'urls'\n      ]\n    },\n    design_links: {\n      type: 'object',\n      description: 'A temporary set of URLs for viewing or editing the design.',\n      properties: {\n        edit_url: {\n          type: 'string',\n          description: 'A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.\\n'\n        }\n      },\n      required: [        'edit_url',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      brand_template_id: {
        type: 'string',
        description: 'ID of the input brand template.',
      },
      data: {
        type: 'object',
        description: 'Data object containing the data fields and values to autofill.',
        additionalProperties: true,
      },
      title: {
        type: 'string',
        description:
          'Title to use for the autofilled design.\n\nIf no design title is provided, the autofilled design will have the same title as the brand template.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['brand_template_id', 'data'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.autofills.create(body)));
};

export default { metadata, tool, handler };

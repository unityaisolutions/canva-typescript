// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'imports',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/imports/{jobId}',
  operationId: 'getDesignImportJob',
};

export const tool: Tool = {
  name: 'retrieve_imports',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGets the result of a design import job created using the [Create design import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/create-design-import-job/).\n\nYou might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/import_retrieve_response',\n  $defs: {\n    import_retrieve_response: {\n      type: 'object',\n      properties: {\n        job: {\n          $ref: '#/$defs/design_import_job'\n        }\n      },\n      required: [        'job'\n      ]\n    },\n    design_import_job: {\n      type: 'object',\n      description: 'The status of the design import job.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the design import job.'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the design import job.',\n          enum: [            'failed',\n            'in_progress',\n            'success'\n          ]\n        },\n        error: {\n          type: 'object',\n          description: 'If the import job fails, this object provides details about the error.',\n          properties: {\n            code: {\n              type: 'string',\n              description: 'A short string about why the import failed. This field can be used to handle errors\\nprogrammatically.',\n              enum: [                'design_creation_throttled',\n                'design_import_throttled',\n                'duplicate_import',\n                'internal_error',\n                'invalid_file',\n                'fetch_failed'\n              ]\n            },\n            message: {\n              type: 'string',\n              description: 'A human-readable description of what went wrong.'\n            }\n          },\n          required: [            'code',\n            'message'\n          ]\n        },\n        result: {\n          type: 'object',\n          properties: {\n            designs: {\n              type: 'array',\n              description: 'A list of designs imported from the external file. It usually contains one item.\\nImports with a large number of pages or assets are split into multiple designs.',\n              items: {\n                $ref: '#/$defs/design_summary'\n              }\n            }\n          },\n          required: [            'designs'\n          ]\n        }\n      },\n      required: [        'id',\n        'status'\n      ]\n    },\n    design_summary: {\n      type: 'object',\n      description: 'Basic details about the design, such as the design\\'s ID, title, and URL.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the design was created in Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the design was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        urls: {\n          $ref: '#/$defs/design_links'\n        },\n        page_count: {\n          type: 'integer',\n          description: 'The total number of pages in the design. Some design types don\\'t have pages (for example, Canva docs).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        },\n        title: {\n          type: 'string',\n          description: 'The design title.'\n        },\n        url: {\n          type: 'string',\n          description: 'URL of the design.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'updated_at',\n        'urls'\n      ]\n    },\n    design_links: {\n      type: 'object',\n      description: 'A temporary set of URLs for viewing or editing the design.',\n      properties: {\n        edit_url: {\n          type: 'string',\n          description: 'A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.\\n'\n        }\n      },\n      required: [        'edit_url',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['jobId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jobId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.imports.retrieve(jobId)));
};

export default { metadata, tool, handler };

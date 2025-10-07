// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'exports',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/exports/{exportId}',
  operationId: 'getDesignExportJob',
};

export const tool: Tool = {
  name: 'retrieve_exports',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGets the result of a design export job that was created using the [Create design export job API](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).\n\nIf the job is successful, the response includes an array\nof download URLs. Depending on the design type and export format, there is a download URL for each page in the design. The download URLs are only valid for 24 hours.\n\nYou might need to make multiple requests to this endpoint until you get a `success` or `failed` status. For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    job: {\n      $ref: '#/$defs/export_job'\n    }\n  },\n  required: [    'job'\n  ],\n  $defs: {\n    export_job: {\n      type: 'object',\n      description: 'The status of the export job.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The export job ID.'\n        },\n        status: {\n          type: 'string',\n          description: 'The export status of the job. A newly created job will be `in_progress` and will eventually\\nbecome `success` or `failed`.',\n          enum: [            'failed',\n            'in_progress',\n            'success'\n          ]\n        },\n        error: {\n          type: 'object',\n          description: 'If the export fails, this object provides details about the error.',\n          properties: {\n            code: {\n              type: 'string',\n              description: 'If the export failed, this specifies the reason why it failed.\\n\\n- `license_required`: The design contains [premium elements](https://www.canva.com/help/premium-elements/) that haven\\'t been purchased. You can either buy the elements or upgrade to a Canva plan (such as Canva Pro) that has premium features, then try again. Alternatively, you can set `export_quality` to `regular` to export your document in regular quality.\\n- `approval_required`: The design requires [reviewer approval](https://www.canva.com/en_au/help/design-approval/) before it can be exported.\\n- `internal_failure`: The service encountered an error when exporting your design.\\n\\n- `license_required` - The design contains [premium elements](https://www.canva.com/help/premium-elements/) that haven\\'t been purchased. You can either buy the elements or upgrade to a Canva plan (such as Canva Pro) that has premium features, then try again. Alternatively, you can set `export_quality` to `regular` to export your document in regular quality.\\n- `approval_required` - The design requires [reviewer approval](https://www.canva.com/en_au/help/design-approval/) before it can be exported.\\n- `internal_failure` - The service encountered an error when exporting your design.',\n              enum: [                'license_required',\n                'approval_required',\n                'internal_failure'\n              ]\n            },\n            message: {\n              type: 'string',\n              description: 'A human-readable description of what went wrong.'\n            }\n          },\n          required: [            'code',\n            'message'\n          ]\n        },\n        urls: {\n          type: 'array',\n          description: 'Download URL(s) for the completed export job. These URLs expire after 24 hours.\\n\\nDepending on the design type and export format, there is a download URL for each page in the design. The list is sorted by page order.',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'id',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      exportId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['exportId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { exportId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.exports.retrieve(exportId)));
};

export default { metadata, tool, handler };

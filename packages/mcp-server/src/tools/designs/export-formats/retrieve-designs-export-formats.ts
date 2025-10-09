// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs.export_formats',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/designs/{designId}/export-formats',
  operationId: 'getDesignExportFormats',
};

export const tool: Tool = {
  name: 'retrieve_designs_export_formats',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nThis API is currently provided as a preview. Be aware of the following:\n\n- There might be unannounced breaking changes.\n- Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).\n- Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.\n\n</Warning>\n\nLists the available file formats for [exporting a design](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/export_format_retrieve_response',\n  $defs: {\n    export_format_retrieve_response: {\n      type: 'object',\n      description: 'Successful response from a `getDesignExportFormats` request.',\n      properties: {\n        formats: {\n          type: 'object',\n          description: 'The available file formats for exporting the design.',\n          properties: {\n            gif: {\n              type: 'object',\n              description: 'Whether the design can be exported as a GIF.',\n              additionalProperties: true\n            },\n            jpg: {\n              type: 'object',\n              description: 'Whether the design can be exported as a JPEG.',\n              additionalProperties: true\n            },\n            mp4: {\n              type: 'object',\n              description: 'Whether the design can be exported as an MP4.',\n              additionalProperties: true\n            },\n            pdf: {\n              type: 'object',\n              description: 'Whether the design can be exported as a PDF.',\n              additionalProperties: true\n            },\n            png: {\n              type: 'object',\n              description: 'Whether the design can be exported as a PNG.',\n              additionalProperties: true\n            },\n            pptx: {\n              type: 'object',\n              description: 'Whether the design can be exported as a PPTX.',\n              additionalProperties: true\n            },\n            svg: {\n              type: 'object',\n              description: 'Whether the design can be exported as an SVG.',\n              additionalProperties: true\n            }\n          }\n        }\n      },\n      required: [        'formats'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      designId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['designId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { designId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.designs.exportFormats.retrieve(designId)),
  );
};

export default { metadata, tool, handler };

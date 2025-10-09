// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'brand_templates',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/brand-templates/{brandTemplateId}/dataset',
  operationId: 'getBrandTemplateDataset',
};

export const tool: Tool = {
  name: 'retrieve_dataset_brand_templates',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nSoon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.\n\n</Warning>\n\n<Note>\n\nTo use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.\n\n</Note>\n\nGets the dataset definition of a brand template. If the brand\ntemplate contains autofill data fields, this API returns an object with the data field\nnames and the type of data they accept.\n\nAvailable data field types include:\n\n- Images\n- Text\n- Charts\n\nYou can autofill a brand template using the [Create a design autofill job\nAPI](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).\n\nWARNING: Chart data fields are a [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might be unannounced breaking changes to this feature which won't produce a new API version.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/brand_template_retrieve_dataset_response',\n  $defs: {\n    brand_template_retrieve_dataset_response: {\n      type: 'object',\n      description: 'Successful response from a `getBrandTemplateDataset` request.',\n      properties: {\n        dataset: {\n          type: 'object',\n          description: 'The dataset definition for the brand template. The dataset definition contains the data inputs available for use with the\\n[Create design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      brandTemplateId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['brandTemplateId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { brandTemplateId, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.brandTemplates.retrieveDataset(brandTemplateId)),
  );
};

export default { metadata, tool, handler };

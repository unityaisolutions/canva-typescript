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
  httpPath: '/v1/brand-templates',
  operationId: 'listBrandTemplates',
};

export const tool: Tool = {
  name: 'list_brand_templates',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n<Warning>\n\nSoon, all brand template IDs will be updated to a new format. If your integration stores brand template IDs, you'll need to migrate to use the new IDs. After we implement this change, you'll have 6 months to migrate before the old IDs are removed.\n\n</Warning>\n\n<Note>\n\nTo use this API, your integration must act on behalf of a user that's a member of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.\n\n</Note>\n\nGet a list of the [brand templates](https://www.canva.com/help/publish-team-template/) the user has access to.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/brand_template_list_response',\n  $defs: {\n    brand_template_list_response: {\n      type: 'object',\n      properties: {\n        items: {\n          type: 'array',\n          description: 'The list of brand templates.',\n          items: {\n            $ref: '#/$defs/brand_template'\n          }\n        },\n        continuation: {\n          type: 'string',\n          description: 'If the success response contains a continuation token, the user has access to more\\nbrand templates you can list. You can use this token as a query parameter and retrieve\\nmore templates from the list, for example\\n`/v1/brand-templates?continuation={continuation}`.\\nTo retrieve all the brand templates available to the user, you might need to make\\nmultiple requests.'\n        }\n      },\n      required: [        'items'\n      ]\n    },\n    brand_template: {\n      type: 'object',\n      description: 'An object representing a brand template with associated metadata.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The brand template ID.'\n        },\n        create_url: {\n          type: 'string',\n          description: 'A URL Canva users can visit to create a new design from the template.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the brand template was created, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        title: {\n          type: 'string',\n          description: 'The brand template title, as shown in the Canva UI.'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the brand template was last updated, as a Unix timestamp\\n(in seconds since the Unix Epoch).'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A URL Canva users can visit to view the brand template.'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        }\n      },\n      required: [        'id',\n        'create_url',\n        'created_at',\n        'title',\n        'updated_at',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      continuation: {
        type: 'string',
        description:
          'If the success response contains a continuation token, the user has access to more\nbrand templates you can list. You can use this token as a query parameter and retrieve\nmore templates from the list, for example\n`/v1/brand-templates?continuation={continuation}`.\nTo retrieve all the brand templates available to the user, you might need to make\nmultiple requests.',
      },
      dataset: {
        type: 'string',
        description:
          "Filter the list of brand templates based on the brand templates' dataset definitions.\nBrand templates with dataset definitions are mainly used with the [Autofill APIs](https://www.canva.dev/docs/connect/api-reference/autofills/).\n\n- `any` - Brand templates with and without dataset definitions.\n- `non_empty` - Brand templates with one or more data fields defined.",
        enum: ['any', 'non_empty'],
      },
      ownership: {
        $ref: '#/$defs/ownership_type',
      },
      query: {
        type: 'string',
        description:
          'Lets you search the brand templates available to the user using a search term or terms.',
      },
      sort_by: {
        $ref: '#/$defs/sort_by_type',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
    $defs: {
      ownership_type: {
        type: 'string',
        description:
          '- `any` - Owned by and shared with the user.\n- `owned` - Owned by the user.\n- `shared` - Shared with the user.',
        enum: ['any', 'owned', 'shared'],
      },
      sort_by_type: {
        type: 'string',
        description:
          '- `relevance` - Sort results using a relevance algorithm.\n- `modified_descending` - Sort results by the date last modified in descending order.\n- `modified_ascending` - Sort results by the date last modified in ascending order.\n- `title_descending` - Sort results by title in descending order.\n- `title_ascending` - Sort results by title in ascending order',
        enum: [
          'relevance',
          'modified_descending',
          'modified_ascending',
          'title_descending',
          'title_ascending',
        ],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.brandTemplates.list(body)));
};

export default { metadata, tool, handler };

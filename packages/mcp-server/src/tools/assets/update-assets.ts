// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'assets',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/assets/{assetId}',
  operationId: 'updateAsset',
};

export const tool: Tool = {
  name: 'update_assets',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nYou can update the name and tags of an asset by specifying its `assetId`. Updating the tags\nreplaces all existing tags of the asset.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/asset_update_response',\n  $defs: {\n    asset_update_response: {\n      type: 'object',\n      properties: {\n        asset: {\n          $ref: '#/$defs/asset'\n        }\n      },\n      required: [        'asset'\n      ]\n    },\n    asset: {\n      type: 'object',\n      description: 'The asset object, which contains metadata about the asset.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The ID of the asset.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the asset was added to Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the asset.'\n        },\n        owner: {\n          $ref: '#/$defs/team_user_summary'\n        },\n        tags: {\n          type: 'array',\n          description: 'The user-facing tags attached to the asset.\\nUsers can add these tags to their uploaded assets, and they can search their uploaded\\nassets in the Canva UI by searching for these tags. For information on how users use\\ntags, see the\\n[Canva Help Center page on asset tags](https://www.canva.com/help/add-edit-tags/).',\n          items: {\n            type: 'string'\n          }\n        },\n        type: {\n          $ref: '#/$defs/asset_type'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the asset was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        import_status: {\n          type: 'object',\n          description: 'The import status of the asset.',\n          properties: {\n            state: {\n              type: 'string',\n              description: 'State of the import job for an uploaded asset.',\n              enum: [                'failed',\n                'in_progress',\n                'success'\n              ]\n            },\n            error: {\n              type: 'object',\n              description: 'If the import fails, this object provides details about the error.',\n              properties: {\n                code: {\n                  type: 'string',\n                  description: 'A short string indicating why the upload failed. This field can be used to handle errors programmatically.',\n                  enum: [                    'file_too_big',\n                    'import_failed'\n                  ]\n                },\n                message: {\n                  type: 'string',\n                  description: 'A human-readable description of what went wrong.'\n                }\n              },\n              required: [                'code',\n                'message'\n              ]\n            }\n          },\n          required: [            'state'\n          ]\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'name',\n        'owner',\n        'tags',\n        'type',\n        'updated_at'\n      ]\n    },\n    team_user_summary: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and Team ID.',\n      properties: {\n        team_id: {\n          type: 'string',\n          description: 'The ID of the user\\'s Canva Team.'\n        },\n        user_id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        }\n      },\n      required: [        'team_id',\n        'user_id'\n      ]\n    },\n    asset_type: {\n      type: 'string',\n      description: 'Type of an asset.',\n      enum: [        'image',\n        'video'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      assetId: {
        type: 'string',
      },
      name: {
        type: 'string',
        description:
          'The name of the asset. This is shown in the Canva UI.\nWhen this field is undefined or empty, nothing is updated.',
      },
      tags: {
        type: 'array',
        description: 'The replacement tags for the asset.\nWhen this field is undefined, nothing is updated.',
        items: {
          type: 'string',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['assetId'],
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { assetId, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.assets.update(assetId, body)));
};

export default { metadata, tool, handler };

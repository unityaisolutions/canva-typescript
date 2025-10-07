// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'assets',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/assets/{assetId}',
  operationId: 'deleteAsset',
};

export const tool: Tool = {
  name: 'delete_assets',
  description:
    "You can delete an asset by specifying its `assetId`. This operation mirrors the behavior\nin the Canva UI. Deleting an item moves it to the trash.\nDeleting an asset doesn't remove it from designs that already use it.",
  inputSchema: {
    type: 'object',
    properties: {
      assetId: {
        type: 'string',
      },
    },
    required: ['assetId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const { assetId, ...body } = args as any;
  const response = await client.assets.delete(assetId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'canva-mcp/filtering';
import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'designs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/designs',
  operationId: 'createDesign',
};

export const tool: Tool = {
  name: 'create_designs',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreates a new Canva design. To create a new design, you can either:\n\n- Use a preset design type.\n- Set height and width dimensions for a custom design.\n\nAdditionally, you can also provide the `asset_id` of an asset in the user's [projects](https://www.canva.com/help/find-designs-and-folders/) to add to the new design. Currently, this only supports image assets. To list the assets in a folder in the user's projects, use the [List folder items API](https://www.canva.dev/docs/connect/api-reference/folders/list-folder-items/).\n\nNOTE: Blank designs created with this API are automatically deleted if they're not edited within 7 days. These blank designs bypass the user's Canva trash and are permanently deleted.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Details about the new design.',\n  properties: {\n    design: {\n      $ref: '#/$defs/design'\n    }\n  },\n  required: [    'design'\n  ],\n  $defs: {\n    design: {\n      type: 'object',\n      description: 'The design object, which contains metadata about the design.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The design ID.'\n        },\n        created_at: {\n          type: 'integer',\n          description: 'When the design was created in Canva, as a Unix timestamp (in seconds since the Unix\\nEpoch).'\n        },\n        owner: {\n          $ref: '#/$defs/team_user_summary'\n        },\n        updated_at: {\n          type: 'integer',\n          description: 'When the design was last updated in Canva, as a Unix timestamp (in seconds since the\\nUnix Epoch).'\n        },\n        urls: {\n          $ref: '#/$defs/design_links'\n        },\n        page_count: {\n          type: 'integer',\n          description: 'The total number of pages in the design. Some design types don\\'t have pages (for example, Canva docs).'\n        },\n        thumbnail: {\n          $ref: '#/$defs/thumbnail'\n        },\n        title: {\n          type: 'string',\n          description: 'The design title.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'owner',\n        'updated_at',\n        'urls'\n      ]\n    },\n    team_user_summary: {\n      type: 'object',\n      description: 'Metadata for the user, consisting of the User ID and Team ID.',\n      properties: {\n        team_id: {\n          type: 'string',\n          description: 'The ID of the user\\'s Canva Team.'\n        },\n        user_id: {\n          type: 'string',\n          description: 'The ID of the user.'\n        }\n      },\n      required: [        'team_id',\n        'user_id'\n      ]\n    },\n    design_links: {\n      type: 'object',\n      description: 'A temporary set of URLs for viewing or editing the design.',\n      properties: {\n        edit_url: {\n          type: 'string',\n          description: 'A temporary editing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.'\n        },\n        view_url: {\n          type: 'string',\n          description: 'A temporary viewing URL for the design. This URL is only accessible to the user that made the API request, and is designed to support [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/) workflows.\\n\\nNOTE: This is not a permanent URL, it is only valid for 30 days.\\n'\n        }\n      },\n      required: [        'edit_url',\n        'view_url'\n      ]\n    },\n    thumbnail: {\n      type: 'object',\n      description: 'A thumbnail image representing the object.',\n      properties: {\n        height: {\n          type: 'integer',\n          description: 'The height of the thumbnail image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'A URL for retrieving the thumbnail image.\\nThis URL expires after 15 minutes. This URL includes a query string\\nthat\\'s required for retrieving the thumbnail.'\n        },\n        width: {\n          type: 'integer',\n          description: 'The width of the thumbnail image in pixels.'\n        }\n      },\n      required: [        'height',\n        'url',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      asset_id: {
        type: 'string',
        description:
          'The ID of an asset to insert into the created design. Currently, this only supports image assets.',
      },
      design_type: {
        $ref: '#/$defs/design_type_input',
      },
      title: {
        type: 'string',
        description: 'The name of the design.',
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.designs.create(body)));
};

export default { metadata, tool, handler };

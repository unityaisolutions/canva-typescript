// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'canva-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Canva from 'canva';

export const metadata: Metadata = {
  resource: 'exports',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/exports',
  operationId: 'createDesignExportJob',
};

export const tool: Tool = {
  name: 'create_exports',
  description:
    'Starts a new [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints) to export a file from Canva. Once the exported file is generated, you can download\nit using the URL(s) provided. The download URLs are only valid for 24 hours.\n\nThe request requires the design ID and the exported file format type.\n\nSupported file formats (and export file type values): PDF (`pdf`), JPG (`jpg`), PNG (`png`), GIF (`gif`), Microsoft PowerPoint (`pptx`), and MP4 (`mp4`).\n\n<Note>\n\nFor more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of export jobs created with this API using the [Get design export job API](https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/).\n\n</Note>',
  inputSchema: {
    type: 'object',
    properties: {
      design_id: {
        type: 'string',
        description: 'The design ID.',
      },
      format: {
        anyOf: [
          {
            type: 'object',
            description: 'Export the design as a PDF. Providing a paper size is optional.',
            properties: {
              type: {
                type: 'string',
                enum: ['pdf'],
              },
              export_quality: {
                $ref: '#/$defs/export_quality',
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
              size: {
                type: 'string',
                description:
                  'The paper size of the export PDF file. The `size` attribute is only supported for Documents (Canva Docs).',
                enum: ['a4', 'a3', 'letter', 'legal'],
              },
            },
            required: ['type'],
          },
          {
            type: 'object',
            description:
              "Export the design as a JPEG. Compression quality must be provided. Height or width (or both)\nmay be specified, otherwise the file will be exported at it's default size.\n\nIf the user is on the Canva Free plan, the export height and width for a fixed-dimension design can't be upscaled by more than a factor of `1.125`.",
            properties: {
              quality: {
                type: 'integer',
                description:
                  'For the `jpg` type, the `quality` of the exported JPEG determines how compressed the exported file should be. A _low_ `quality` value will create a file with a smaller file size, but the resulting file will have pixelated artifacts when compared to a file created with a _high_ `quality` value.',
              },
              type: {
                type: 'string',
                enum: ['jpg'],
              },
              export_quality: {
                $ref: '#/$defs/export_quality',
              },
              height: {
                type: 'integer',
                description:
                  "Specify the height in pixels of the exported image. Note the following behavior:\n\n- If no height or width is specified, the image is exported using the dimensions of the design.\n- If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
              width: {
                type: 'integer',
                description:
                  "Specify the width in pixels of the exported image. Note the following behavior:\n\n- If no width or height is specified, the image is exported using the dimensions of the design.\n- If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
            },
            required: ['quality', 'type'],
          },
          {
            type: 'object',
            description:
              "Export the design as a PNG. Height or width (or both) may be specified, otherwise\nthe file will be exported at it's default size. You may also specify whether to export the\nfile losslessly, and whether to export a multi-page design as a single image.\n\nIf the user is on the Canva Free plan, the export height and width for a fixed-dimension design can't be upscaled by more than a factor of `1.125`.",
            properties: {
              type: {
                type: 'string',
                enum: ['png'],
              },
              as_single_image: {
                type: 'boolean',
                description:
                  'When `true`, multi-page designs are merged into a single image.\nWhen `false` (default), each page is exported as a separate image.',
              },
              export_quality: {
                $ref: '#/$defs/export_quality',
              },
              height: {
                type: 'integer',
                description:
                  "Specify the height in pixels of the exported image. Note the following behavior:\n\n- If no height or width is specified, the image is exported using the dimensions of the design.\n- If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
              lossless: {
                type: 'boolean',
                description:
                  'If set to `true` (default), the PNG is exported without compression.\nIf set to `false`, the PNG is compressed using a lossy compression algorithm. Lossy PNG compression is only available to users on a Canva plan that has premium features, such as Canva Pro. If the user is on the Canva Free plan and this parameter is set to `false`, the export operation will fail.',
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
              transparent_background: {
                type: 'boolean',
                description:
                  'If set to `true`, the PNG is exported with a transparent background.\nThis option is only available to users on a Canva plan that has premium features, such as Canva Pro. If the user is on the Canva Free plan and this parameter is set to `true`, the export operation will fail.',
              },
              width: {
                type: 'integer',
                description:
                  "Specify the width in pixels of the exported image. Note the following behavior:\n\n- If no width or height is specified, the image is exported using the dimensions of the design.\n- If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
            },
            required: ['type'],
          },
          {
            type: 'object',
            description: 'Export the design as a PPTX.',
            properties: {
              type: {
                type: 'string',
                enum: ['pptx'],
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['type'],
          },
          {
            type: 'object',
            description:
              "Export the design as a GIF. Height or width (or both) may be specified, otherwise the file\nwill be exported at it's default size. Large designs will be scaled down, and aspect ratio\nwill always be maintained.",
            properties: {
              type: {
                type: 'string',
                enum: ['gif'],
              },
              export_quality: {
                $ref: '#/$defs/export_quality',
              },
              height: {
                type: 'integer',
                description:
                  "Specify the height in pixels of the exported image. Note the following behavior:\n\n- If no height or width is specified, the image is exported using the dimensions of the design.\n- If only one of height or width is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the height and width are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
              width: {
                type: 'integer',
                description:
                  "Specify the width in pixels of the exported image. Note the following behavior:\n\n- If no width or height is specified, the image is exported using the dimensions of the design.\n- If only one of width or height is specified, then the image is scaled to match that dimension, respecting the design's aspect ratio.\n- If both the width and height are specified, but the values don't match the design's aspect ratio, the export defaults to the larger dimension.",
              },
            },
            required: ['type'],
          },
          {
            type: 'object',
            description: 'Export the design as an MP4. You must specify the quality of the exported video.',
            properties: {
              quality: {
                type: 'string',
                description:
                  'The orientation and resolution of the exported video. Orientation is either `horizontal` or\n`vertical`, and resolution is one of `480p`, `720p`, `1080p` or `4k`.',
                enum: [
                  'horizontal_480p',
                  'horizontal_720p',
                  'horizontal_1080p',
                  'horizontal_4k',
                  'vertical_480p',
                  'vertical_720p',
                  'vertical_1080p',
                  'vertical_4k',
                ],
              },
              type: {
                type: 'string',
                enum: ['mp4'],
              },
              export_quality: {
                $ref: '#/$defs/export_quality',
              },
              pages: {
                type: 'array',
                description:
                  "To specify which pages to export in a multi-page design, provide the page numbers as\nan array. The first page in a design is page `1`.\nIf `pages` isn't specified, all the pages are exported.",
                items: {
                  type: 'integer',
                },
              },
            },
            required: ['quality', 'type'],
          },
        ],
        description: 'Details about the desired export format.',
      },
    },
    required: ['design_id', 'format'],
    $defs: {
      export_quality: {
        type: 'string',
        description:
          "Specifies the export quality of the design.\n\n- `regular` - Regular quality export.\n- `pro` - Premium quality export.\n\n  NOTE: A `pro` export might fail if the design contains [premium elements](https://www.canva.com/help/premium-elements/) and the calling user either hasn't purchased the elements or isn't on a Canva plan (such as Canva Pro) that has premium features.",
        enum: ['regular', 'pro'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Canva, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.exports.create(body));
};

export default { metadata, tool, handler };

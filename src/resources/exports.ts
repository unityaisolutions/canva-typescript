// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExportsAPI from './exports';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Exports extends APIResource {
  /**
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to export a file from Canva. Once the exported file is generated, you can
   * download it using the URL(s) provided. The download URLs are only valid for 24
   * hours.
   *
   * The request requires the design ID and the exported file format type.
   *
   * Supported file formats (and export file type values): PDF (`pdf`), JPG (`jpg`),
   * PNG (`png`), GIF (`gif`), Microsoft PowerPoint (`pptx`), and MP4 (`mp4`).
   *
   * <Note>
   *
   * For more information on the workflow for using asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   * You can check the status and get the results of export jobs created with this
   * API using the
   * [Get design export job API](https://www.canva.dev/docs/connect/api-reference/exports/get-design-export-job/).
   *
   * </Note>
   *
   * @example
   * ```ts
   * const _export = await client.exports.create({
   *   design_id: 'DAVZr1z5464',
   *   format: { type: 'pdf' },
   * });
   * ```
   */
  create(body: ExportCreateParams, options?: RequestOptions): APIPromise<ExportCreateResponse> {
    return this._client.post('/v1/exports', { body, ...options });
  }

  /**
   * Gets the result of a design export job that was created using the
   * [Create design export job API](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).
   *
   * If the job is successful, the response includes an array of download URLs.
   * Depending on the design type and export format, there is a download URL for each
   * page in the design. The download URLs are only valid for 24 hours.
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const _export = await client.exports.retrieve('exportId');
   * ```
   */
  retrieve(exportID: string, options?: RequestOptions): APIPromise<ExportRetrieveResponse> {
    return this._client.get(path`/v1/exports/${exportID}`, options);
  }
}

/**
 * The status of the export job.
 */
export interface ExportJob {
  /**
   * The export job ID.
   */
  id: string;

  /**
   * The export status of the job. A newly created job will be `in_progress` and will
   * eventually become `success` or `failed`.
   */
  status: 'failed' | 'in_progress' | 'success';

  /**
   * If the export fails, this object provides details about the error.
   */
  error?: ExportJob.Error;

  /**
   * Download URL(s) for the completed export job. These URLs expire after 24 hours.
   *
   * Depending on the design type and export format, there is a download URL for each
   * page in the design. The list is sorted by page order.
   */
  urls?: Array<string>;
}

export namespace ExportJob {
  /**
   * If the export fails, this object provides details about the error.
   */
  export interface Error {
    /**
     * If the export failed, this specifies the reason why it failed.
     *
     * - `license_required`: The design contains
     *   [premium elements](https://www.canva.com/help/premium-elements/) that haven't
     *   been purchased. You can either buy the elements or upgrade to a Canva plan
     *   (such as Canva Pro) that has premium features, then try again. Alternatively,
     *   you can set `export_quality` to `regular` to export your document in regular
     *   quality.
     * - `approval_required`: The design requires
     *   [reviewer approval](https://www.canva.com/en_au/help/design-approval/) before
     *   it can be exported.
     * - `internal_failure`: The service encountered an error when exporting your
     *   design.
     *
     * - `license_required` - The design contains
     *   [premium elements](https://www.canva.com/help/premium-elements/) that haven't
     *   been purchased. You can either buy the elements or upgrade to a Canva plan
     *   (such as Canva Pro) that has premium features, then try again. Alternatively,
     *   you can set `export_quality` to `regular` to export your document in regular
     *   quality.
     * - `approval_required` - The design requires
     *   [reviewer approval](https://www.canva.com/en_au/help/design-approval/) before
     *   it can be exported.
     * - `internal_failure` - The service encountered an error when exporting your
     *   design.
     */
    code: 'license_required' | 'approval_required' | 'internal_failure';

    /**
     * A human-readable description of what went wrong.
     */
    message: string;
  }
}

/**
 * Specifies the export quality of the design.
 *
 * - `regular` - Regular quality export.
 * - `pro` - Premium quality export.
 *
 *   NOTE: A `pro` export might fail if the design contains
 *   [premium elements](https://www.canva.com/help/premium-elements/) and the
 *   calling user either hasn't purchased the elements or isn't on a Canva plan
 *   (such as Canva Pro) that has premium features.
 */
export type ExportQuality = 'regular' | 'pro';

export interface ExportCreateResponse {
  /**
   * The status of the export job.
   */
  job: ExportJob;
}

export interface ExportRetrieveResponse {
  /**
   * The status of the export job.
   */
  job: ExportJob;
}

export interface ExportCreateParams {
  /**
   * The design ID.
   */
  design_id: string;

  /**
   * Details about the desired export format.
   */
  format:
    | ExportCreateParams.PdfExportFormat
    | ExportCreateParams.JpgExportFormat
    | ExportCreateParams.PngExportFormat
    | ExportCreateParams.PptxExportFormat
    | ExportCreateParams.GifExportFormat
    | ExportCreateParams.MP4ExportFormat;
}

export namespace ExportCreateParams {
  /**
   * Export the design as a PDF. Providing a paper size is optional.
   */
  export interface PdfExportFormat {
    type: 'pdf';

    /**
     * Specifies the export quality of the design.
     */
    export_quality?: ExportsAPI.ExportQuality;

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;

    /**
     * The paper size of the export PDF file. The `size` attribute is only supported
     * for Documents (Canva Docs).
     */
    size?: 'a4' | 'a3' | 'letter' | 'legal';
  }

  /**
   * Export the design as a JPEG. Compression quality must be provided. Height or
   * width (or both) may be specified, otherwise the file will be exported at it's
   * default size.
   *
   * If the user is on the Canva Free plan, the export height and width for a
   * fixed-dimension design can't be upscaled by more than a factor of `1.125`.
   */
  export interface JpgExportFormat {
    /**
     * For the `jpg` type, the `quality` of the exported JPEG determines how compressed
     * the exported file should be. A _low_ `quality` value will create a file with a
     * smaller file size, but the resulting file will have pixelated artifacts when
     * compared to a file created with a _high_ `quality` value.
     */
    quality: number;

    type: 'jpg';

    /**
     * Specifies the export quality of the design.
     */
    export_quality?: ExportsAPI.ExportQuality;

    /**
     * Specify the height in pixels of the exported image. Note the following behavior:
     *
     * - If no height or width is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of height or width is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the height and width are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    height?: number;

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;

    /**
     * Specify the width in pixels of the exported image. Note the following behavior:
     *
     * - If no width or height is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of width or height is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the width and height are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    width?: number;
  }

  /**
   * Export the design as a PNG. Height or width (or both) may be specified,
   * otherwise the file will be exported at it's default size. You may also specify
   * whether to export the file losslessly, and whether to export a multi-page design
   * as a single image.
   *
   * If the user is on the Canva Free plan, the export height and width for a
   * fixed-dimension design can't be upscaled by more than a factor of `1.125`.
   */
  export interface PngExportFormat {
    type: 'png';

    /**
     * When `true`, multi-page designs are merged into a single image. When `false`
     * (default), each page is exported as a separate image.
     */
    as_single_image?: boolean;

    /**
     * Specifies the export quality of the design.
     */
    export_quality?: ExportsAPI.ExportQuality;

    /**
     * Specify the height in pixels of the exported image. Note the following behavior:
     *
     * - If no height or width is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of height or width is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the height and width are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    height?: number;

    /**
     * If set to `true` (default), the PNG is exported without compression. If set to
     * `false`, the PNG is compressed using a lossy compression algorithm. Lossy PNG
     * compression is only available to users on a Canva plan that has premium
     * features, such as Canva Pro. If the user is on the Canva Free plan and this
     * parameter is set to `false`, the export operation will fail.
     */
    lossless?: boolean;

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;

    /**
     * If set to `true`, the PNG is exported with a transparent background. This option
     * is only available to users on a Canva plan that has premium features, such as
     * Canva Pro. If the user is on the Canva Free plan and this parameter is set to
     * `true`, the export operation will fail.
     */
    transparent_background?: boolean;

    /**
     * Specify the width in pixels of the exported image. Note the following behavior:
     *
     * - If no width or height is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of width or height is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the width and height are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    width?: number;
  }

  /**
   * Export the design as a PPTX.
   */
  export interface PptxExportFormat {
    type: 'pptx';

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;
  }

  /**
   * Export the design as a GIF. Height or width (or both) may be specified,
   * otherwise the file will be exported at it's default size. Large designs will be
   * scaled down, and aspect ratio will always be maintained.
   */
  export interface GifExportFormat {
    type: 'gif';

    /**
     * Specifies the export quality of the design.
     */
    export_quality?: ExportsAPI.ExportQuality;

    /**
     * Specify the height in pixels of the exported image. Note the following behavior:
     *
     * - If no height or width is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of height or width is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the height and width are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    height?: number;

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;

    /**
     * Specify the width in pixels of the exported image. Note the following behavior:
     *
     * - If no width or height is specified, the image is exported using the dimensions
     *   of the design.
     * - If only one of width or height is specified, then the image is scaled to match
     *   that dimension, respecting the design's aspect ratio.
     * - If both the width and height are specified, but the values don't match the
     *   design's aspect ratio, the export defaults to the larger dimension.
     */
    width?: number;
  }

  /**
   * Export the design as an MP4. You must specify the quality of the exported video.
   */
  export interface MP4ExportFormat {
    /**
     * The orientation and resolution of the exported video. Orientation is either
     * `horizontal` or `vertical`, and resolution is one of `480p`, `720p`, `1080p` or
     * `4k`.
     */
    quality:
      | 'horizontal_480p'
      | 'horizontal_720p'
      | 'horizontal_1080p'
      | 'horizontal_4k'
      | 'vertical_480p'
      | 'vertical_720p'
      | 'vertical_1080p'
      | 'vertical_4k';

    type: 'mp4';

    /**
     * Specifies the export quality of the design.
     */
    export_quality?: ExportsAPI.ExportQuality;

    /**
     * To specify which pages to export in a multi-page design, provide the page
     * numbers as an array. The first page in a design is page `1`. If `pages` isn't
     * specified, all the pages are exported.
     */
    pages?: Array<number>;
  }
}

export declare namespace Exports {
  export {
    type ExportJob as ExportJob,
    type ExportQuality as ExportQuality,
    type ExportCreateResponse as ExportCreateResponse,
    type ExportRetrieveResponse as ExportRetrieveResponse,
    type ExportCreateParams as ExportCreateParams,
  };
}

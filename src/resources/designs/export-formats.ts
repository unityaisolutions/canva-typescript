// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ExportFormats extends APIResource {
  /**
   * <Warning>
   *
   * This API is currently provided as a preview. Be aware of the following:
   *
   * - There might be unannounced breaking changes.
   * - Any breaking changes to preview APIs won't produce a new
   *   [API version](https://www.canva.dev/docs/connect/versions/).
   * - Public integrations that use preview APIs will not pass the review process,
   *   and can't be made available to all Canva users.
   *
   * </Warning>
   *
   * Lists the available file formats for
   * [exporting a design](https://www.canva.dev/docs/connect/api-reference/exports/create-design-export-job/).
   *
   * @example
   * ```ts
   * const exportFormat =
   *   await client.designs.exportFormats.retrieve('designId');
   * ```
   */
  retrieve(designID: string, options?: RequestOptions): APIPromise<ExportFormatRetrieveResponse> {
    return this._client.get(path`/v1/designs/${designID}/export-formats`, options);
  }
}

/**
 * Successful response from a `getDesignExportFormats` request.
 */
export interface ExportFormatRetrieveResponse {
  /**
   * The available file formats for exporting the design.
   */
  formats: ExportFormatRetrieveResponse.Formats;
}

export namespace ExportFormatRetrieveResponse {
  /**
   * The available file formats for exporting the design.
   */
  export interface Formats {
    /**
     * Whether the design can be exported as a GIF.
     */
    gif?: unknown;

    /**
     * Whether the design can be exported as a JPEG.
     */
    jpg?: unknown;

    /**
     * Whether the design can be exported as an MP4.
     */
    mp4?: unknown;

    /**
     * Whether the design can be exported as a PDF.
     */
    pdf?: unknown;

    /**
     * Whether the design can be exported as a PNG.
     */
    png?: unknown;

    /**
     * Whether the design can be exported as a PPTX.
     */
    pptx?: unknown;

    /**
     * Whether the design can be exported as an SVG.
     */
    svg?: unknown;
  }
}

export declare namespace ExportFormats {
  export { type ExportFormatRetrieveResponse as ExportFormatRetrieveResponse };
}

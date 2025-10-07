// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from '../assets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Pages extends APIResource {
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
   * Lists metadata for pages in a design, such as page-specific thumbnails.
   *
   * For the specified design, you can provide `offset` and `limit` values to specify
   * the range of pages to return.
   *
   * NOTE: Some design types don't have pages (for example, Canva docs).
   *
   * @example
   * ```ts
   * const page = await client.designs.pages.retrieve(
   *   'designId',
   * );
   * ```
   */
  retrieve(
    designID: string,
    query: PageRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PageRetrieveResponse> {
    return this._client.get(path`/v1/designs/${designID}/pages`, { query, ...options });
  }
}

/**
 * Successful response from a `getDesignPages` request.
 */
export interface PageRetrieveResponse {
  /**
   * The list of pages.
   */
  items: Array<PageRetrieveResponse.Item>;
}

export namespace PageRetrieveResponse {
  /**
   * Basic details about a page in a design, such as the page's index and thumbnail.
   */
  export interface Item {
    /**
     * The index of the page in the design. The first page in a design has the index
     * value `1`.
     */
    index: number;

    /**
     * A thumbnail image representing the object.
     */
    thumbnail?: AssetsAPI.Thumbnail;
  }
}

export interface PageRetrieveParams {
  /**
   * The number of pages to return, starting at the page index specified using the
   * `offset` parameter.
   */
  limit?: number;

  /**
   * The page index to start the range of pages to return.
   *
   * Pages are indexed using one-based numbering, so the first page in a design has
   * the index value `1`.
   */
  offset?: number;
}

export declare namespace Pages {
  export { type PageRetrieveResponse as PageRetrieveResponse, type PageRetrieveParams as PageRetrieveParams };
}

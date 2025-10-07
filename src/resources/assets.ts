// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MeAPI from './users/me';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Assets extends APIResource {
  /**
   * You can retrieve the metadata of an asset by specifying its `assetId`.
   *
   * @example
   * ```ts
   * const asset = await client.assets.retrieve('assetId');
   * ```
   */
  retrieve(assetID: string, options?: RequestOptions): APIPromise<AssetRetrieveResponse> {
    return this._client.get(path`/v1/assets/${assetID}`, options);
  }

  /**
   * You can update the name and tags of an asset by specifying its `assetId`.
   * Updating the tags replaces all existing tags of the asset.
   *
   * @example
   * ```ts
   * const asset = await client.assets.update('assetId');
   * ```
   */
  update(
    assetID: string,
    body: AssetUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AssetUpdateResponse> {
    return this._client.patch(path`/v1/assets/${assetID}`, { body, ...options });
  }

  /**
   * You can delete an asset by specifying its `assetId`. This operation mirrors the
   * behavior in the Canva UI. Deleting an item moves it to the trash. Deleting an
   * asset doesn't remove it from designs that already use it.
   *
   * @example
   * ```ts
   * await client.assets.delete('assetId');
   * ```
   */
  delete(assetID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/assets/${assetID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The asset object, which contains metadata about the asset.
 */
export interface Asset {
  /**
   * The ID of the asset.
   */
  id: string;

  /**
   * When the asset was added to Canva, as a Unix timestamp (in seconds since the
   * Unix Epoch).
   */
  created_at: number;

  /**
   * The name of the asset.
   */
  name: string;

  /**
   * Metadata for the user, consisting of the User ID and Team ID.
   */
  owner: MeAPI.TeamUserSummary;

  /**
   * The user-facing tags attached to the asset. Users can add these tags to their
   * uploaded assets, and they can search their uploaded assets in the Canva UI by
   * searching for these tags. For information on how users use tags, see the
   * [Canva Help Center page on asset tags](https://www.canva.com/help/add-edit-tags/).
   */
  tags: Array<string>;

  /**
   * Type of an asset.
   */
  type: AssetType;

  /**
   * When the asset was last updated in Canva, as a Unix timestamp (in seconds since
   * the Unix Epoch).
   */
  updated_at: number;

  /**
   * @deprecated The import status of the asset.
   */
  import_status?: Asset.ImportStatus;

  /**
   * A thumbnail image representing the object.
   */
  thumbnail?: Thumbnail;
}

export namespace Asset {
  /**
   * @deprecated The import status of the asset.
   */
  export interface ImportStatus {
    /**
     * @deprecated State of the import job for an uploaded asset.
     */
    state: 'failed' | 'in_progress' | 'success';

    /**
     * @deprecated If the import fails, this object provides details about the error.
     */
    error?: ImportStatus.Error;
  }

  export namespace ImportStatus {
    /**
     * @deprecated If the import fails, this object provides details about the error.
     */
    export interface Error {
      /**
       * @deprecated A short string indicating why the upload failed. This field can be
       * used to handle errors programmatically.
       */
      code: 'file_too_big' | 'import_failed';

      /**
       * A human-readable description of what went wrong.
       */
      message: string;
    }
  }
}

/**
 * Type of an asset.
 */
export type AssetType = 'image' | 'video';

/**
 * A thumbnail image representing the object.
 */
export interface Thumbnail {
  /**
   * The height of the thumbnail image in pixels.
   */
  height: number;

  /**
   * A URL for retrieving the thumbnail image. This URL expires after 15 minutes.
   * This URL includes a query string that's required for retrieving the thumbnail.
   */
  url: string;

  /**
   * The width of the thumbnail image in pixels.
   */
  width: number;
}

export interface AssetRetrieveResponse {
  /**
   * The asset object, which contains metadata about the asset.
   */
  asset: Asset;
}

export interface AssetUpdateResponse {
  /**
   * The asset object, which contains metadata about the asset.
   */
  asset: Asset;
}

export interface AssetUpdateParams {
  /**
   * The name of the asset. This is shown in the Canva UI. When this field is
   * undefined or empty, nothing is updated.
   */
  name?: string;

  /**
   * The replacement tags for the asset. When this field is undefined, nothing is
   * updated.
   */
  tags?: Array<string>;
}

export declare namespace Assets {
  export {
    type Asset as Asset,
    type AssetType as AssetType,
    type Thumbnail as Thumbnail,
    type AssetRetrieveResponse as AssetRetrieveResponse,
    type AssetUpdateResponse as AssetUpdateResponse,
    type AssetUpdateParams as AssetUpdateParams,
  };
}

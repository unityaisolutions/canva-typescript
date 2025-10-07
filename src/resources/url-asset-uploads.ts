// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AssetUploadsAPI from './asset-uploads';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class URLAssetUploads extends APIResource {
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
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to upload an asset from a URL to the user's content library. Supported file
   * types for assets are listed in the
   * [Assets API overview](https://www.canva.dev/docs/connect/api-reference/assets/).
   *
   * <Note>
   *  Uploading a video asset from a URL is limited to a maximum 100MB file size. For importing larger video files, use the [Create asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/create-asset-upload-job/).
   * </Note>
   *
   * <Note>
   * For more information on the workflow for using asynchronous jobs, see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints). You can check the status and get the results of asset upload jobs created with this API using the [Get asset upload job via URL API](https://www.canva.dev/docs/connect/api-reference/assets/get-url-asset-upload-job/).
   * </Note>
   *
   * @example
   * ```ts
   * const urlAssetUpload = await client.urlAssetUploads.create({
   *   name: 'My Awesome Asset',
   *   url: 'https://example.com/my_asset_to_upload.jpg',
   * });
   * ```
   */
  create(
    body: URLAssetUploadCreateParams,
    options?: RequestOptions,
  ): APIPromise<URLAssetUploadCreateResponse> {
    return this._client.post('/v1/url-asset-uploads', { body, ...options });
  }

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
   * Get the result of an asset upload job that was created using the
   * [Create asset upload job via URL API](https://www.canva.dev/docs/connect/api-reference/assets/create-url-asset-upload-job/).
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const urlAssetUpload =
   *   await client.urlAssetUploads.retrieve('jobId');
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<URLAssetUploadRetrieveResponse> {
    return this._client.get(path`/v1/url-asset-uploads/${jobID}`, options);
  }
}

export interface URLAssetUploadCreateResponse {
  /**
   * The status of the asset upload job.
   */
  job: AssetUploadsAPI.AssetUploadJob;
}

export interface URLAssetUploadRetrieveResponse {
  /**
   * The status of the asset upload job.
   */
  job: AssetUploadsAPI.AssetUploadJob;
}

export interface URLAssetUploadCreateParams {
  /**
   * A name for the asset.
   */
  name: string;

  /**
   * The URL of the file to import. This URL must be accessible from the internet and
   * be publicly available.
   */
  url: string;
}

export declare namespace URLAssetUploads {
  export {
    type URLAssetUploadCreateResponse as URLAssetUploadCreateResponse,
    type URLAssetUploadRetrieveResponse as URLAssetUploadRetrieveResponse,
    type URLAssetUploadCreateParams as URLAssetUploadCreateParams,
  };
}

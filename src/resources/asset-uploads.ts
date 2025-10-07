// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AssetsAPI from './assets';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AssetUploads extends APIResource {
  /**
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to upload an asset to the user's content library. Supported file types for
   * assets are listed in the
   * [Assets API overview](https://www.canva.dev/docs/connect/api-reference/assets/).
   *
   * The request format for this endpoint is an `application/octet-stream` body of
   * bytes. Attach information about the upload using an `Asset-Upload-Metadata`
   * header.
   *
   * <Note>
   *
   * For more information on the workflow for using asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   * You can check the status and get the results of asset upload jobs created with
   * this API using the
   * [Get asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/get-asset-upload-job/).
   *
   * </Note>
   */
  create(
    body: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    params: AssetUploadCreateParams,
    options?: RequestOptions,
  ): APIPromise<AssetUploadCreateResponse> {
    const { 'Asset-Upload-Metadata': assetUploadMetadata } = params;
    return this._client.post('/v1/asset-uploads', {
      body: body,
      ...options,
      headers: buildHeaders([
        {
          'Content-Type': 'application/octet-stream',
          'Asset-Upload-Metadata': assetUploadMetadata.toString(),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get the result of an asset upload job that was created using the
   * [Create asset upload job API](https://www.canva.dev/docs/connect/api-reference/assets/create-asset-upload-job/).
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<AssetUploadRetrieveResponse> {
    return this._client.get(path`/v1/asset-uploads/${jobID}`, options);
  }
}

/**
 * The status of the asset upload job.
 */
export interface AssetUploadJob {
  /**
   * The ID of the asset upload job.
   */
  id: string;

  /**
   * Status of the asset upload job.
   */
  status: 'failed' | 'in_progress' | 'success';

  /**
   * The asset object, which contains metadata about the asset.
   */
  asset?: AssetsAPI.Asset;

  /**
   * If the upload fails, this object provides details about the error.
   */
  error?: AssetUploadJob.Error;
}

export namespace AssetUploadJob {
  /**
   * If the upload fails, this object provides details about the error.
   */
  export interface Error {
    /**
     * A short string indicating why the upload failed. This field can be used to
     * handle errors programmatically.
     */
    code: 'file_too_big' | 'import_failed' | 'fetch_failed';

    /**
     * A human-readable description of what went wrong.
     */
    message: string;
  }
}

export interface AssetUploadCreateResponse {
  /**
   * The status of the asset upload job.
   */
  job: AssetUploadJob;
}

export interface AssetUploadRetrieveResponse {
  /**
   * The status of the asset upload job.
   */
  job: AssetUploadJob;
}

export interface AssetUploadCreateParams {
  /**
   * Header param:
   */
  'Asset-Upload-Metadata': unknown;
}

export declare namespace AssetUploads {
  export {
    type AssetUploadJob as AssetUploadJob,
    type AssetUploadCreateResponse as AssetUploadCreateResponse,
    type AssetUploadRetrieveResponse as AssetUploadRetrieveResponse,
    type AssetUploadCreateParams as AssetUploadCreateParams,
  };
}

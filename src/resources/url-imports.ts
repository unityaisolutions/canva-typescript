// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ImportsAPI from './imports';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class URLImports extends APIResource {
  /**
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to import an external file from a URL as a new design in Canva.
   *
   * Supported file types for imports are listed in
   * [Design imports overview](https://www.canva.dev/docs/connect/api-reference/design-imports/#supported-file-types).
   *
   * <Note>
   *
   * For more information on the workflow for using asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   * You can check the status and get the results of design import jobs created with
   * this API using the
   * [Get URL import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/get-url-import-job/).
   *
   * </Note>
   *
   * @example
   * ```ts
   * const urlImport = await client.urlImports.create({
   *   title: 'My Awesome Design',
   *   url: 'x',
   * });
   * ```
   */
  create(body: URLImportCreateParams, options?: RequestOptions): APIPromise<URLImportCreateResponse> {
    return this._client.post('/v1/url-imports', { body, ...options });
  }

  /**
   * Gets the result of a URL import job created using the
   * [Create URL import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/create-url-import-job/).
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const urlImport = await client.urlImports.retrieve(
   *   'f81b26fd-a33d-4c2d-9e8c-4a7aca798b17',
   * );
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<URLImportRetrieveResponse> {
    return this._client.get(path`/v1/url-imports/${jobID}`, options);
  }
}

export interface URLImportCreateResponse {
  /**
   * The status of the design import job.
   */
  job: ImportsAPI.DesignImportJob;
}

export interface URLImportRetrieveResponse {
  /**
   * The status of the design import job.
   */
  job: ImportsAPI.DesignImportJob;
}

export interface URLImportCreateParams {
  /**
   * A title for the design.
   */
  title: string;

  /**
   * The URL of the file to import. This URL must be accessible from the internet and
   * be publicly available.
   */
  url: string;

  /**
   * The MIME type of the file being imported. If not provided, Canva attempts to
   * automatically detect the type of the file.
   */
  mime_type?: string;
}

export declare namespace URLImports {
  export {
    type URLImportCreateResponse as URLImportCreateResponse,
    type URLImportRetrieveResponse as URLImportRetrieveResponse,
    type URLImportCreateParams as URLImportCreateParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ResizesAPI from './resizes';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Imports extends APIResource {
  /**
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to import an external file as a new design in Canva.
   *
   * The request format for this endpoint has an `application/octet-stream` body of
   * bytes, and the information about the import is provided using an
   * `Import-Metadata` header.
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
   * [Get design import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/get-design-import-job/).
   *
   * </Note>
   *
   * @example
   * ```ts
   * const _import = await client.imports.create(
   *   fs.createReadStream('path/to/file'),
   *   { 'Import-Metadata': {} },
   * );
   * ```
   */
  create(
    body: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    params: ImportCreateParams,
    options?: RequestOptions,
  ): APIPromise<ImportCreateResponse> {
    const { 'Import-Metadata': importMetadata } = params;
    return this._client.post('/v1/imports', {
      body: body,
      ...options,
      headers: buildHeaders([
        { 'Content-Type': 'application/octet-stream', 'Import-Metadata': importMetadata.toString() },
        options?.headers,
      ]),
    });
  }

  /**
   * Gets the result of a design import job created using the
   * [Create design import job API](https://www.canva.dev/docs/connect/api-reference/design-imports/create-design-import-job/).
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const _import = await client.imports.retrieve(
   *   'f81b26fd-a33d-4c2d-9e8c-4a7aca798b17',
   * );
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<ImportRetrieveResponse> {
    return this._client.get(path`/v1/imports/${jobID}`, options);
  }
}

/**
 * The status of the design import job.
 */
export interface DesignImportJob {
  /**
   * The ID of the design import job.
   */
  id: string;

  /**
   * The status of the design import job.
   */
  status: 'failed' | 'in_progress' | 'success';

  /**
   * If the import job fails, this object provides details about the error.
   */
  error?: DesignImportJob.Error;

  result?: DesignImportJob.Result;
}

export namespace DesignImportJob {
  /**
   * If the import job fails, this object provides details about the error.
   */
  export interface Error {
    /**
     * A short string about why the import failed. This field can be used to handle
     * errors programmatically.
     */
    code:
      | 'design_creation_throttled'
      | 'design_import_throttled'
      | 'duplicate_import'
      | 'internal_error'
      | 'invalid_file'
      | 'fetch_failed';

    /**
     * A human-readable description of what went wrong.
     */
    message: string;
  }

  export interface Result {
    /**
     * A list of designs imported from the external file. It usually contains one item.
     * Imports with a large number of pages or assets are split into multiple designs.
     */
    designs: Array<ResizesAPI.DesignSummary>;
  }
}

export interface ImportCreateResponse {
  /**
   * The status of the design import job.
   */
  job: DesignImportJob;
}

export interface ImportRetrieveResponse {
  /**
   * The status of the design import job.
   */
  job: DesignImportJob;
}

export interface ImportCreateParams {
  /**
   * Header param:
   */
  'Import-Metadata': unknown;
}

export declare namespace Imports {
  export {
    type DesignImportJob as DesignImportJob,
    type ImportCreateResponse as ImportCreateResponse,
    type ImportRetrieveResponse as ImportRetrieveResponse,
    type ImportCreateParams as ImportCreateParams,
  };
}

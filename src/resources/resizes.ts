// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ResizesAPI from './resizes';
import * as AssetsAPI from './assets';
import * as DesignsAPI from './designs/designs';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Resizes extends APIResource {
  /**
   * <Note>
   *
   * To use this API, your integration must act on behalf of a user that's on a Canva
   * plan with premium features (such as Canva Pro).
   *
   * </Note>
   *
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to create a resized copy of a design. The new resized design is added to the top
   * level of the user's
   * [projects](https://www.canva.com/help/find-designs-and-folders/) (`root`
   * folder).
   *
   * To resize a design into a new design, you can either:
   *
   * - Use a preset design type.
   * - Set height and width dimensions for a custom design.
   *
   * Note the following behaviors and restrictions when resizing designs:
   *
   * - Designs can be resized to a maximum area of 25,000,000 pixels squared.
   * - Resizing designs using the Connect API always creates a new design. In-place
   *   resizing is currently not available in the Connect API, but can be done in the
   *   Canva UI.
   * - Resizing a multi-page design results in all pages of the design being resized.
   *   Resizing a section of a design is only available in the Canva UI.
   * - [Canva docs](https://www.canva.com/create/documents/) can't be resized, and
   *   other design types can't be resized to a Canva doc.
   * - Canva Code designs can't be resized, and other design types can't be resized
   *   to a Canva Code design.
   *
   * <Note>
   * For more information on the workflow for using asynchronous jobs,
   * see [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   * You can check the status and get the results of resize jobs created with this API using the
   * [Get design resize job API](https://www.canva.dev/docs/connect/api-reference/resizes/get-design-resize-job/).
   * </Note>
   *
   * @example
   * ```ts
   * const resize = await client.resizes.create({
   *   design_id: 'DAGirp_1ZUA',
   *   design_type: {
   *     type: 'custom',
   *     width: 1000,
   *     height: 1500,
   *   },
   * });
   * ```
   */
  create(body: ResizeCreateParams, options?: RequestOptions): APIPromise<ResizeCreateResponse> {
    return this._client.post('/v1/resizes', { body, ...options });
  }

  /**
   * <Note>
   *
   * To use this API, your integration must act on behalf of a user that's on a Canva
   * plan with premium features (such as Canva Pro).
   *
   * </Note>
   *
   * Gets the result of a design resize job that was created using the
   * [Create design resize job API](https://www.canva.dev/docs/connect/api-reference/resizes/create-design-resize-job/).
   *
   * If the job is successful, the response includes a summary of the new resized
   * design, including its metadata.
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const resize = await client.resizes.retrieve('jobId');
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<ResizeRetrieveResponse> {
    return this._client.get(path`/v1/resizes/${jobID}`, options);
  }
}

/**
 * Details about the design resize job.
 */
export interface DesignResizeJob {
  /**
   * The design resize job ID.
   */
  id: string;

  /**
   * Status of the design resize job.
   */
  status: 'in_progress' | 'success' | 'failed';

  /**
   * If the design resize job fails, this object provides details about the error.
   */
  error?: DesignResizeJob.Error;

  /**
   * Design has been created and saved to user's root
   * ([projects](https://www.canva.com/help/find-designs-and-folders/)) folder.
   */
  result?: DesignResizeJob.Result;
}

export namespace DesignResizeJob {
  /**
   * If the design resize job fails, this object provides details about the error.
   */
  export interface Error {
    code:
      | 'thumbnail_generation_error'
      | 'design_resize_error'
      | 'create_design_error'
      | 'trial_quota_exceeded';

    /**
     * A human-readable description of what went wrong.
     */
    message: string;
  }

  /**
   * Design has been created and saved to user's root
   * ([projects](https://www.canva.com/help/find-designs-and-folders/)) folder.
   */
  export interface Result {
    /**
     * Basic details about the design, such as the design's ID, title, and URL.
     */
    design: ResizesAPI.DesignSummary;
  }
}

/**
 * Basic details about the design, such as the design's ID, title, and URL.
 */
export interface DesignSummary {
  /**
   * The design ID.
   */
  id: string;

  /**
   * When the design was created in Canva, as a Unix timestamp (in seconds since the
   * Unix Epoch).
   */
  created_at: number;

  /**
   * When the design was last updated in Canva, as a Unix timestamp (in seconds since
   * the Unix Epoch).
   */
  updated_at: number;

  /**
   * A temporary set of URLs for viewing or editing the design.
   */
  urls: DesignsAPI.DesignLinks;

  /**
   * The total number of pages in the design. Some design types don't have pages (for
   * example, Canva docs).
   */
  page_count?: number;

  /**
   * A thumbnail image representing the object.
   */
  thumbnail?: AssetsAPI.Thumbnail;

  /**
   * The design title.
   */
  title?: string;

  /**
   * URL of the design.
   */
  url?: string;
}

export interface ResizeCreateResponse {
  /**
   * Details about the design resize job.
   */
  job: DesignResizeJob;
}

export interface ResizeRetrieveResponse {
  /**
   * Details about the design resize job.
   */
  job: DesignResizeJob;
}

export interface ResizeCreateParams {
  /**
   * The design ID.
   */
  design_id: string;

  /**
   * The desired design type.
   */
  design_type: DesignsAPI.DesignTypeInput;
}

export declare namespace Resizes {
  export {
    type DesignResizeJob as DesignResizeJob,
    type DesignSummary as DesignSummary,
    type ResizeCreateResponse as ResizeCreateResponse,
    type ResizeRetrieveResponse as ResizeRetrieveResponse,
    type ResizeCreateParams as ResizeCreateParams,
  };
}

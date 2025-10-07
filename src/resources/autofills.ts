// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ResizesAPI from './resizes';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Autofills extends APIResource {
  /**
   * <Warning>
   *
   * Soon, all brand template IDs will be updated to a new format. If your
   * integration stores brand template IDs, you'll need to migrate to use the new
   * IDs. After we implement this change, you'll have 6 months to migrate before the
   * old IDs are removed.
   *
   * </Warning>
   *
   * <Note>
   *
   * To use this API, your integration must act on behalf of a user that's a member
   * of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.
   *
   * </Note>
   *
   * Starts a new
   * [asynchronous job](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints)
   * to autofill a Canva design using a brand template and input data.
   *
   * To get a list of input data fields, use the
   * [Get brand template dataset API](https://www.canva.dev/docs/connect/api-reference/brand-templates/get-brand-template-dataset/).
   *
   * Available data field types to autofill include:
   *
   * - Images
   * - Text
   * - Charts
   *
   *   WARNING: Chart data fields are a
   *   [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There
   *   might be unannounced breaking changes to this feature which won't produce a
   *   new API version.
   *
   * <Note>
   *
   * For more information on the workflow for using asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   * You can check the status and get the results of autofill jobs created with this
   * API using the
   * [Get design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/get-design-autofill-job/).
   *
   * </Note>
   *
   * @example
   * ```ts
   * const autofill = await client.autofills.create({
   *   brand_template_id: 'DAFVztcvd9z',
   *   data: {
   *     cute_pet_image_of_the_day: { ... },
   *     cute_pet_witty_pet_says: { ... },
   *     cute_pet_sales_chart: { ... },
   *   },
   * });
   * ```
   */
  create(body: AutofillCreateParams, options?: RequestOptions): APIPromise<AutofillCreateResponse> {
    return this._client.post('/v1/autofills', { body, ...options });
  }

  /**
   * <Note>
   *
   * To use this API, your integration must act on behalf of a user that's a member
   * of a [Canva Enterprise](https://www.canva.com/enterprise/) organization.
   *
   * </Note>
   *
   * Get the result of a design autofill job that was created using the
   * [Create design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).
   *
   * You might need to make multiple requests to this endpoint until you get a
   * `success` or `failed` status. For more information on the workflow for using
   * asynchronous jobs, see
   * [API requests and responses](https://www.canva.dev/docs/connect/api-requests-responses/#asynchronous-job-endpoints).
   *
   * @example
   * ```ts
   * const autofill = await client.autofills.retrieve('jobId');
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<AutofillRetrieveResponse> {
    return this._client.get(path`/v1/autofills/${jobID}`, options);
  }
}

/**
 * Details about the autofill job.
 */
export interface DesignAutofillJob {
  /**
   * ID of the asynchronous job that is creating the design using the provided data.
   */
  id: string;

  /**
   * Status of the design autofill job.
   */
  status: 'in_progress' | 'success' | 'failed';

  /**
   * If the autofill job fails, this object provides details about the error.
   */
  error?: DesignAutofillJob.Error;

  /**
   * Design has been created and saved to user's root folder.
   */
  result?: DesignAutofillJob.Result;
}

export namespace DesignAutofillJob {
  /**
   * If the autofill job fails, this object provides details about the error.
   */
  export interface Error {
    code: 'autofill_error' | 'thumbnail_generation_error' | 'create_design_error';

    /**
     * A human-readable description of what went wrong.
     */
    message: string;
  }

  /**
   * Design has been created and saved to user's root folder.
   */
  export interface Result {
    /**
     * Basic details about the design, such as the design's ID, title, and URL.
     */
    design: ResizesAPI.DesignSummary;

    type: 'create_design';
  }
}

export interface AutofillCreateResponse {
  /**
   * Details about the autofill job.
   */
  job: DesignAutofillJob;
}

export interface AutofillRetrieveResponse {
  /**
   * Details about the autofill job.
   */
  job: DesignAutofillJob;
}

export interface AutofillCreateParams {
  /**
   * ID of the input brand template.
   */
  brand_template_id: string;

  /**
   * Data object containing the data fields and values to autofill.
   */
  data: {
    [key: string]:
      | AutofillCreateParams.DatasetImageValue
      | AutofillCreateParams.DatasetTextValue
      | AutofillCreateParams.DatasetChartValue;
  };

  /**
   * Title to use for the autofilled design.
   *
   * If no design title is provided, the autofilled design will have the same title
   * as the brand template.
   */
  title?: string;
}

export namespace AutofillCreateParams {
  /**
   * If the data field is an image field.
   */
  export interface DatasetImageValue {
    /**
     * `asset_id` of the image to insert into the template element.
     */
    asset_id: string;

    type: 'image';
  }

  /**
   * If the data field is a text field.
   */
  export interface DatasetTextValue {
    /**
     * Text to insert into the template element.
     */
    text: string;

    type: 'text';
  }

  /**
   * If the data field is a chart.
   *
   * WARNING: Chart data fields are a
   * [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might
   * be unannounced breaking changes to this feature which won't produce a new API
   * version.
   */
  export interface DatasetChartValue {
    /**
     * Tabular data, structured in rows of cells.
     *
     * - The first row usually contains column headers.
     * - Each cell must have a data type configured.
     * - All rows must have the same number of cells.
     * - Maximum of 100 rows and 20 columns.
     *
     * WARNING: Chart data fields are a
     * [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might
     * be unannounced breaking changes to this feature which won't produce a new API
     * version.
     */
    chart_data: DatasetChartValue.ChartData;

    type: 'chart';
  }

  export namespace DatasetChartValue {
    /**
     * Tabular data, structured in rows of cells.
     *
     * - The first row usually contains column headers.
     * - Each cell must have a data type configured.
     * - All rows must have the same number of cells.
     * - Maximum of 100 rows and 20 columns.
     *
     * WARNING: Chart data fields are a
     * [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might
     * be unannounced breaking changes to this feature which won't produce a new API
     * version.
     */
    export interface ChartData {
      /**
       * Rows of data.
       *
       * The first row usually contains column headers.
       */
      rows: Array<ChartData.Row>;
    }

    export namespace ChartData {
      /**
       * A single row of tabular data.
       */
      export interface Row {
        /**
         * Cells of data in row.
         *
         * All rows must have the same number of cells.
         */
        cells: Array<
          Row.StringDataTableCell | Row.NumberDataTableCell | Row.BooleanDataTableCell | Row.DateDataTableCell
        >;
      }

      export namespace Row {
        /**
         * A string tabular data cell.
         */
        export interface StringDataTableCell {
          type: 'string';

          value?: string;
        }

        /**
         * A number tabular data cell.
         */
        export interface NumberDataTableCell {
          type: 'number';

          value?: number;
        }

        /**
         * A boolean tabular data cell.
         */
        export interface BooleanDataTableCell {
          type: 'boolean';

          value?: boolean;
        }

        /**
         * A date tabular data cell.
         *
         * Specified as a Unix timestamp (in seconds since the Unix Epoch).
         */
        export interface DateDataTableCell {
          type: 'date';

          value?: number;
        }
      }
    }
  }
}

export declare namespace Autofills {
  export {
    type DesignAutofillJob as DesignAutofillJob,
    type AutofillCreateResponse as AutofillCreateResponse,
    type AutofillRetrieveResponse as AutofillRetrieveResponse,
    type AutofillCreateParams as AutofillCreateParams,
  };
}

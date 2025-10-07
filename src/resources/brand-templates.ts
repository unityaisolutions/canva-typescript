// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AssetsAPI from './assets';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BrandTemplates extends APIResource {
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
   * Retrieves the metadata for a brand template.
   */
  retrieve(brandTemplateID: string, options?: RequestOptions): APIPromise<BrandTemplateRetrieveResponse> {
    return this._client.get(path`/v1/brand-templates/${brandTemplateID}`, options);
  }

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
   * Get a list of the
   * [brand templates](https://www.canva.com/help/publish-team-template/) the user
   * has access to.
   */
  list(
    query: BrandTemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrandTemplateListResponse> {
    return this._client.get('/v1/brand-templates', { query, ...options });
  }

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
   * Gets the dataset definition of a brand template. If the brand template contains
   * autofill data fields, this API returns an object with the data field names and
   * the type of data they accept.
   *
   * Available data field types include:
   *
   * - Images
   * - Text
   * - Charts
   *
   * You can autofill a brand template using the
   * [Create a design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).
   *
   * WARNING: Chart data fields are a
   * [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might
   * be unannounced breaking changes to this feature which won't produce a new API
   * version.
   */
  retrieveDataset(
    brandTemplateID: string,
    options?: RequestOptions,
  ): APIPromise<BrandTemplateRetrieveDatasetResponse> {
    return this._client.get(path`/v1/brand-templates/${brandTemplateID}/dataset`, options);
  }
}

/**
 * An object representing a brand template with associated metadata.
 */
export interface BrandTemplate {
  /**
   * The brand template ID.
   */
  id: string;

  /**
   * A URL Canva users can visit to create a new design from the template.
   */
  create_url: string;

  /**
   * When the brand template was created, as a Unix timestamp (in seconds since the
   * Unix Epoch).
   */
  created_at: number;

  /**
   * The brand template title, as shown in the Canva UI.
   */
  title: string;

  /**
   * When the brand template was last updated, as a Unix timestamp (in seconds since
   * the Unix Epoch).
   */
  updated_at: number;

  /**
   * A URL Canva users can visit to view the brand template.
   */
  view_url: string;

  /**
   * A thumbnail image representing the object.
   */
  thumbnail?: AssetsAPI.Thumbnail;
}

/**
 * - `any` - Owned by and shared with the user.
 * - `owned` - Owned by the user.
 * - `shared` - Shared with the user.
 */
export type OwnershipType = 'any' | 'owned' | 'shared';

/**
 * - `relevance` - Sort results using a relevance algorithm.
 * - `modified_descending` - Sort results by the date last modified in descending
 *   order.
 * - `modified_ascending` - Sort results by the date last modified in ascending
 *   order.
 * - `title_descending` - Sort results by title in descending order.
 * - `title_ascending` - Sort results by title in ascending order
 */
export type SortByType =
  | 'relevance'
  | 'modified_descending'
  | 'modified_ascending'
  | 'title_descending'
  | 'title_ascending';

/**
 * Successful response from a `getBrandTemplate` request.
 */
export interface BrandTemplateRetrieveResponse {
  /**
   * An object representing a brand template with associated metadata.
   */
  brand_template: BrandTemplate;
}

export interface BrandTemplateListResponse {
  /**
   * The list of brand templates.
   */
  items: Array<BrandTemplate>;

  /**
   * If the success response contains a continuation token, the user has access to
   * more brand templates you can list. You can use this token as a query parameter
   * and retrieve more templates from the list, for example
   * `/v1/brand-templates?continuation={continuation}`. To retrieve all the brand
   * templates available to the user, you might need to make multiple requests.
   */
  continuation?: string;
}

/**
 * Successful response from a `getBrandTemplateDataset` request.
 */
export interface BrandTemplateRetrieveDatasetResponse {
  /**
   * The dataset definition for the brand template. The dataset definition contains
   * the data inputs available for use with the
   * [Create design autofill job API](https://www.canva.dev/docs/connect/api-reference/autofills/create-design-autofill-job/).
   */
  dataset?: {
    [key: string]:
      | BrandTemplateRetrieveDatasetResponse.ImageDataField
      | BrandTemplateRetrieveDatasetResponse.TextDataField
      | BrandTemplateRetrieveDatasetResponse.ChartDataField;
  };
}

export namespace BrandTemplateRetrieveDatasetResponse {
  /**
   * An image for a brand template. You can autofill the brand template with an image
   * by providing its `asset_id`.
   */
  export interface ImageDataField {
    type: 'image';
  }

  /**
   * Some text for a brand template. You can autofill the brand template with this
   * value.
   */
  export interface TextDataField {
    type: 'text';
  }

  /**
   * Chart data for a brand template. You can autofill the brand template with
   * tabular data.
   *
   * WARNING: Chart data fields are a
   * [preview feature](https://www.canva.dev/docs/connect/#preview-apis). There might
   * be unannounced breaking changes to this feature which won't produce a new API
   * version.
   */
  export interface ChartDataField {
    type: 'chart';
  }
}

export interface BrandTemplateListParams {
  /**
   * If the success response contains a continuation token, the user has access to
   * more brand templates you can list. You can use this token as a query parameter
   * and retrieve more templates from the list, for example
   * `/v1/brand-templates?continuation={continuation}`. To retrieve all the brand
   * templates available to the user, you might need to make multiple requests.
   */
  continuation?: string;

  /**
   * Filter the list of brand templates based on the brand templates' dataset
   * definitions. Brand templates with dataset definitions are mainly used with the
   * [Autofill APIs](https://www.canva.dev/docs/connect/api-reference/autofills/).
   *
   * - `any` - Brand templates with and without dataset definitions.
   * - `non_empty` - Brand templates with one or more data fields defined.
   */
  dataset?: 'any' | 'non_empty';

  /**
   * Filter the list of brand templates based on the user's ownership of the brand
   * templates.
   */
  ownership?: OwnershipType;

  /**
   * Lets you search the brand templates available to the user using a search term or
   * terms.
   */
  query?: string;

  /**
   * Sort the list of brand templates.
   */
  sort_by?: SortByType;
}

export declare namespace BrandTemplates {
  export {
    type BrandTemplate as BrandTemplate,
    type OwnershipType as OwnershipType,
    type SortByType as SortByType,
    type BrandTemplateRetrieveResponse as BrandTemplateRetrieveResponse,
    type BrandTemplateListResponse as BrandTemplateListResponse,
    type BrandTemplateRetrieveDatasetResponse as BrandTemplateRetrieveDatasetResponse,
    type BrandTemplateListParams as BrandTemplateListParams,
  };
}

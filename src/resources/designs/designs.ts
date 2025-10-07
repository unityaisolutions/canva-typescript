// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from '../assets';
import * as BrandTemplatesAPI from '../brand-templates';
import * as ExportFormatsAPI from './export-formats';
import { ExportFormatRetrieveResponse, ExportFormats } from './export-formats';
import * as PagesAPI from './pages';
import { PageRetrieveParams, PageRetrieveResponse, Pages } from './pages';
import * as MeAPI from '../users/me';
import * as CommentsAPI from './comments/comments';
import {
  CommentCreateParams,
  CommentCreateResponse,
  CommentRetrieveParams,
  CommentRetrieveResponse,
  Comments,
  Thread,
} from './comments/comments';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Designs extends APIResource {
  comments: CommentsAPI.Comments = new CommentsAPI.Comments(this._client);
  pages: PagesAPI.Pages = new PagesAPI.Pages(this._client);
  exportFormats: ExportFormatsAPI.ExportFormats = new ExportFormatsAPI.ExportFormats(this._client);

  /**
   * Creates a new Canva design. To create a new design, you can either:
   *
   * - Use a preset design type.
   * - Set height and width dimensions for a custom design.
   *
   * Additionally, you can also provide the `asset_id` of an asset in the user's
   * [projects](https://www.canva.com/help/find-designs-and-folders/) to add to the
   * new design. Currently, this only supports image assets. To list the assets in a
   * folder in the user's projects, use the
   * [List folder items API](https://www.canva.dev/docs/connect/api-reference/folders/list-folder-items/).
   *
   * NOTE: Blank designs created with this API are automatically deleted if they're
   * not edited within 7 days. These blank designs bypass the user's Canva trash and
   * are permanently deleted.
   *
   * @example
   * ```ts
   * const design = await client.designs.create();
   * ```
   */
  create(
    body: DesignCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DesignCreateResponse> {
    return this._client.post('/v1/designs', { body, ...options });
  }

  /**
   * Gets the metadata for a design. This includes owner information, URLs for
   * editing and viewing, and thumbnail information.
   *
   * @example
   * ```ts
   * const design = await client.designs.retrieve('designId');
   * ```
   */
  retrieve(designID: string, options?: RequestOptions): APIPromise<DesignRetrieveResponse> {
    return this._client.get(path`/v1/designs/${designID}`, options);
  }

  /**
   * Lists metadata for all the designs in a Canva user's
   * [projects](https://www.canva.com/help/find-designs-and-folders/). You can also:
   *
   * - Use search terms to filter the listed designs.
   * - Show designs either created by, or shared with the user.
   * - Sort the results.
   *
   * @example
   * ```ts
   * const designs = await client.designs.list();
   * ```
   */
  list(
    query: DesignListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DesignListResponse> {
    return this._client.get('/v1/designs', { query, ...options });
  }
}

/**
 * Provide the width and height to define a custom design type.
 */
export interface CustomDesignTypeInput {
  /**
   * The height of the design, in pixels.
   */
  height: number;

  type: 'custom';

  /**
   * The width of the design, in pixels.
   */
  width: number;
}

/**
 * The design object, which contains metadata about the design.
 */
export interface Design {
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
   * Metadata for the user, consisting of the User ID and Team ID.
   */
  owner: MeAPI.TeamUserSummary;

  /**
   * When the design was last updated in Canva, as a Unix timestamp (in seconds since
   * the Unix Epoch).
   */
  updated_at: number;

  /**
   * A temporary set of URLs for viewing or editing the design.
   */
  urls: DesignLinks;

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
}

/**
 * A temporary set of URLs for viewing or editing the design.
 */
export interface DesignLinks {
  /**
   * A temporary editing URL for the design. This URL is only accessible to the user
   * that made the API request, and is designed to support
   * [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/)
   * workflows.
   *
   * NOTE: This is not a permanent URL, it is only valid for 30 days.
   */
  edit_url: string;

  /**
   * A temporary viewing URL for the design. This URL is only accessible to the user
   * that made the API request, and is designed to support
   * [return navigation](https://www.canva.dev/docs/connect/return-navigation-guide/)
   * workflows.
   *
   * NOTE: This is not a permanent URL, it is only valid for 30 days.
   */
  view_url: string;
}

/**
 * The desired design type.
 */
export type DesignTypeInput = PresetDesignTypeInput | CustomDesignTypeInput;

/**
 * Provide the common design type.
 */
export interface PresetDesignTypeInput {
  /**
   * The name of the design type.
   *
   * - `doc` - A [Canva doc](https://www.canva.com/docs/); a document for Canva's
   *   online text editor.
   * - `whiteboard` - A [whiteboard](https://www.canva.com/online-whiteboard/); a
   *   design which gives you infinite space to collaborate.
   * - `presentation` - A [presentation](https://www.canva.com/presentations/); lets
   *   you create and collaborate for presenting to an audience.
   */
  name: 'doc' | 'whiteboard' | 'presentation';

  type: 'preset';
}

/**
 * Details about the new design.
 */
export interface DesignCreateResponse {
  /**
   * The design object, which contains metadata about the design.
   */
  design: Design;
}

/**
 * Successful response from a `getDesign` request.
 */
export interface DesignRetrieveResponse {
  /**
   * The design object, which contains metadata about the design.
   */
  design: Design;
}

export interface DesignListResponse {
  /**
   * The list of designs.
   */
  items: Array<Design>;

  /**
   * A continuation token. If the success response contains a continuation token, the
   * list contains more designs you can list. You can use this token as a query
   * parameter and retrieve more designs from the list, for example
   * `/v1/designs?continuation={continuation}`.
   *
   * To retrieve all of a user's designs, you might need to make multiple requests.
   */
  continuation?: string;
}

export interface DesignCreateParams {
  /**
   * The ID of an asset to insert into the created design. Currently, this only
   * supports image assets.
   */
  asset_id?: string;

  /**
   * The desired design type.
   */
  design_type?: DesignTypeInput;

  /**
   * The name of the design.
   */
  title?: string;
}

export interface DesignListParams {
  /**
   * If the success response contains a continuation token, the list contains more
   * designs you can list. You can use this token as a query parameter and retrieve
   * more designs from the list, for example
   * `/v1/designs?continuation={continuation}`.
   *
   * To retrieve all of a user's designs, you might need to make multiple requests.
   */
  continuation?: string;

  /**
   * Filter the list of designs based on the user's ownership of the designs.
   */
  ownership?: BrandTemplatesAPI.OwnershipType;

  /**
   * Lets you search the user's designs, and designs shared with the user, using a
   * search term or terms.
   */
  query?: string;

  /**
   * Sort the list of designs.
   */
  sort_by?: BrandTemplatesAPI.SortByType;
}

Designs.Comments = Comments;
Designs.Pages = Pages;
Designs.ExportFormats = ExportFormats;

export declare namespace Designs {
  export {
    type CustomDesignTypeInput as CustomDesignTypeInput,
    type Design as Design,
    type DesignLinks as DesignLinks,
    type DesignTypeInput as DesignTypeInput,
    type PresetDesignTypeInput as PresetDesignTypeInput,
    type DesignCreateResponse as DesignCreateResponse,
    type DesignRetrieveResponse as DesignRetrieveResponse,
    type DesignListResponse as DesignListResponse,
    type DesignCreateParams as DesignCreateParams,
    type DesignListParams as DesignListParams,
  };

  export {
    Comments as Comments,
    type Thread as Thread,
    type CommentCreateResponse as CommentCreateResponse,
    type CommentRetrieveResponse as CommentRetrieveResponse,
    type CommentCreateParams as CommentCreateParams,
    type CommentRetrieveParams as CommentRetrieveParams,
  };

  export {
    Pages as Pages,
    type PageRetrieveResponse as PageRetrieveResponse,
    type PageRetrieveParams as PageRetrieveParams,
  };

  export {
    ExportFormats as ExportFormats,
    type ExportFormatRetrieveResponse as ExportFormatRetrieveResponse,
  };
}

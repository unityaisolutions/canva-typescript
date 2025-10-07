// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FoldersAPI from './folders';
import * as AssetsAPI from './assets';
import * as ResizesAPI from './resizes';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Folders extends APIResource {
  /**
   * Creates a folder in one of the following locations:
   *
   * - The top level of a Canva user's
   *   [projects](https://www.canva.com/help/find-designs-and-folders/) (using the ID
   *   `root`),
   * - The user's Uploads folder (using the ID `uploads`),
   * - Another folder (using the parent folder's ID).
   *
   * When a folder is successfully created, the endpoint returns its folder ID, along
   * with other information.
   *
   * @example
   * ```ts
   * const folder = await client.folders.create({
   *   name: 'My awesome holiday',
   *   parent_folder_id: 'FAF2lZtloor',
   * });
   * ```
   */
  create(body: FolderCreateParams, options?: RequestOptions): APIPromise<FolderCreateResponse> {
    return this._client.post('/v1/folders', { body, ...options });
  }

  /**
   * Gets the name and other details of a folder using a folder's `folderID`.
   *
   * @example
   * ```ts
   * const folder = await client.folders.retrieve('FAF2lZtloor');
   * ```
   */
  retrieve(folderID: string, options?: RequestOptions): APIPromise<FolderRetrieveResponse> {
    return this._client.get(path`/v1/folders/${folderID}`, options);
  }

  /**
   * Updates a folder's details using its `folderID`. Currently, you can only update
   * a folder's name.
   *
   * @example
   * ```ts
   * const folder = await client.folders.update('FAF2lZtloor', {
   *   name: 'My awesome holiday',
   * });
   * ```
   */
  update(
    folderID: string,
    body: FolderUpdateParams,
    options?: RequestOptions,
  ): APIPromise<FolderUpdateResponse> {
    return this._client.patch(path`/v1/folders/${folderID}`, { body, ...options });
  }

  /**
   * Deletes a folder with the specified `folderID`. Deleting a folder moves the
   * user's content in the folder to the
   * [Trash](https://www.canva.com/help/deleted-designs/) and content owned by other
   * users is moved to the top level of the owner's
   * [projects](https://www.canva.com/help/find-designs-and-folders/).
   *
   * @example
   * ```ts
   * await client.folders.delete('FAF2lZtloor');
   * ```
   */
  delete(folderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/folders/${folderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Lists the items in a folder, including each item's `type`.
   *
   * Folders can contain:
   *
   * - Other folders.
   * - Designs, such as Instagram posts, Presentations, and Documents
   *   ([Canva Docs](https://www.canva.com/create/documents/)).
   * - Image assets.
   *
   * Currently, video assets are not returned in the response.
   *
   * @example
   * ```ts
   * const response = await client.folders.listItems(
   *   'FAF2lZtloor',
   * );
   * ```
   */
  listItems(
    folderID: string,
    query: FolderListItemsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FolderListItemsResponse> {
    return this._client.get(path`/v1/folders/${folderID}/items`, { query, ...options });
  }

  /**
   * Moves an item to another folder. You must specify the folder ID of the
   * destination folder, as well as the ID of the item you want to move.
   *
   * NOTE: In some situations, a single item can exist in multiple folders. If you
   * attempt to move an item that exists in multiple folders, the API returns an
   * `item_in_multiple_folders` error. In this case, you must use the Canva UI to
   * move the item to another folder.
   *
   * @example
   * ```ts
   * await client.folders.moveItem({
   *   item_id: 'Msd59349ff',
   *   to_folder_id: 'FAF2lZtloor',
   * });
   * ```
   */
  moveItem(body: FolderMoveItemParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/folders/move', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The folder object, which contains metadata about the folder.
 */
export interface Folder {
  /**
   * The folder ID.
   */
  id: string;

  /**
   * When the folder was created, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  created_at: number;

  /**
   * The folder name.
   */
  name: string;

  /**
   * When the folder was last updated, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  updated_at: number;

  /**
   * A thumbnail image representing the object.
   */
  thumbnail?: AssetsAPI.Thumbnail;
}

/**
 * Details about the new folder.
 */
export interface FolderCreateResponse {
  /**
   * The folder object, which contains metadata about the folder.
   */
  folder?: Folder;
}

/**
 * The folder ID.
 */
export interface FolderRetrieveResponse {
  /**
   * The folder object, which contains metadata about the folder.
   */
  folder: Folder;
}

/**
 * Details about the updated folder.
 */
export interface FolderUpdateResponse {
  /**
   * The folder object, which contains metadata about the folder.
   */
  folder?: Folder;
}

/**
 * A list of the items in a folder. If the success response contains a continuation
 * token, the folder contains more items you can list. You can use this token as a
 * query parameter and retrieve more items from the list, for example
 * `/v1/folders/{folderId}/items?continuation={continuation}`.
 *
 * To retrieve all the items in a folder, you might need to make multiple requests.
 */
export interface FolderListItemsResponse {
  /**
   * An array of items in the folder.
   */
  items: Array<
    | FolderListItemsResponse.FolderItem
    | FolderListItemsResponse.DesignItem
    | FolderListItemsResponse.ImageItem
  >;

  /**
   * If the success response contains a continuation token, the folder contains more
   * items you can list. You can use this token as a query parameter and retrieve
   * more items from the list, for example
   * `/v1/folders/{folderId}/items?continuation={continuation}`.
   *
   * To retrieve all the items in a folder, you might need to make multiple requests.
   */
  continuation?: string;
}

export namespace FolderListItemsResponse {
  /**
   * Details about the folder.
   */
  export interface FolderItem {
    /**
     * The folder object, which contains metadata about the folder.
     */
    folder: FoldersAPI.Folder;

    type: 'folder';
  }

  /**
   * Details about the design.
   */
  export interface DesignItem {
    /**
     * Basic details about the design, such as the design's ID, title, and URL.
     */
    design: ResizesAPI.DesignSummary;

    type: 'design';
  }

  /**
   * Details about the image asset.
   */
  export interface ImageItem {
    /**
     * An object representing an asset with associated metadata.
     */
    image: ImageItem.Image;

    type: 'image';
  }

  export namespace ImageItem {
    /**
     * An object representing an asset with associated metadata.
     */
    export interface Image {
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
       * The user-facing tags attached to the asset. Users can add these tags to their
       * uploaded assets, and they can search their uploaded assets in the Canva UI by
       * searching for these tags. For information on how users use tags, see the
       * [Canva Help Center page on asset tags](https://www.canva.com/help/add-edit-tags/).
       */
      tags: Array<string>;

      /**
       * Type of an asset.
       */
      type: AssetsAPI.AssetType;

      /**
       * When the asset was last updated in Canva, as a Unix timestamp (in seconds since
       * the Unix Epoch).
       */
      updated_at: number;

      /**
       * A thumbnail image representing the object.
       */
      thumbnail?: AssetsAPI.Thumbnail;
    }
  }
}

export interface FolderCreateParams {
  /**
   * The name of the folder.
   */
  name: string;

  /**
   * The folder ID of the parent folder. To create a new folder at the top level of a
   * user's [projects](https://www.canva.com/help/find-designs-and-folders/), use the
   * ID `root`. To create it in their Uploads folder, use `uploads`.
   */
  parent_folder_id: string;
}

export interface FolderUpdateParams {
  /**
   * The folder name, as shown in the Canva UI.
   */
  name: string;
}

export interface FolderListItemsParams {
  /**
   * If the success response contains a continuation token, the folder contains more
   * items you can list. You can use this token as a query parameter and retrieve
   * more items from the list, for example
   * `/v1/folders/{folderId}/items?continuation={continuation}`.
   *
   * To retrieve all the items in a folder, you might need to make multiple requests.
   */
  continuation?: string;

  /**
   * Filter the folder items to only return specified types. The available types are:
   * `design`, `folder`, and `image`. To filter for more than one item type, provide
   * a comma- delimited list.
   */
  item_types?: Array<'design' | 'folder' | 'image'>;

  /**
   * Sort the list of folder items.
   *
   * - `created_ascending` - Sort results by creation date, in ascending order.
   * - `created_descending` - Sort results by creation date, in descending order.
   * - `modified_ascending` - Sort results by the last modified date, in ascending
   *   order.
   * - `modified_descending` - Sort results by the last modified date, in descending
   *   order.
   * - `title_ascending` - Sort results by title, in ascending order. The title is
   *   either the `name` field for a folder or asset, or the `title` field for a
   *   design.
   * - `title_descending` - Sort results by title, in descending order. The title is
   *   either the `name` field for a folder or asset, or the `title` field for a
   *   design.
   */
  sort_by?:
    | 'created_ascending'
    | 'created_descending'
    | 'modified_ascending'
    | 'modified_descending'
    | 'title_ascending'
    | 'title_descending';
}

export interface FolderMoveItemParams {
  /**
   * The ID of the item you want to move. Currently, video assets are not supported.
   */
  item_id: string;

  /**
   * The ID of the folder you want to move the item to (the destination folder). If
   * you want to move the item to the top level of a Canva user's
   * [projects](https://www.canva.com/help/find-designs-and-folders/), use the ID
   * `root`.
   */
  to_folder_id: string;
}

export declare namespace Folders {
  export {
    type Folder as Folder,
    type FolderCreateResponse as FolderCreateResponse,
    type FolderRetrieveResponse as FolderRetrieveResponse,
    type FolderUpdateResponse as FolderUpdateResponse,
    type FolderListItemsResponse as FolderListItemsResponse,
    type FolderCreateParams as FolderCreateParams,
    type FolderUpdateParams as FolderUpdateParams,
    type FolderListItemsParams as FolderListItemsParams,
    type FolderMoveItemParams as FolderMoveItemParams,
  };
}

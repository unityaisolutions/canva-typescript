// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CommentsAPI from '../../comments';
import * as RepliesAPI from './replies';
import {
  CommentContent,
  Replies,
  Reply,
  ReplyCreateParams,
  ReplyCreateResponse,
  ReplyListParams,
  ReplyListResponse,
  ReplyRetrieveParams,
  ReplyRetrieveResponse,
} from './replies';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Comments extends APIResource {
  replies: RepliesAPI.Replies = new RepliesAPI.Replies(this._client);

  /**
   * <Warning>
   * This API is currently provided as a preview. Be aware of the following:
   * - There might be unannounced breaking changes.
   * - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
   * - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.
   * </Warning>
   *
   * Creates a new comment thread on a design. For information on comments and how
   * they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @example
   * ```ts
   * const comment = await client.designs.comments.create(
   *   'designId',
   *   {
   *     message_plaintext:
   *       'Great work [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!',
   *   },
   * );
   * ```
   */
  create(
    designID: string,
    body: CommentCreateParams,
    options?: RequestOptions,
  ): APIPromise<CommentCreateResponse> {
    return this._client.post(path`/v1/designs/${designID}/comments`, { body, ...options });
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
   * Gets a comment or suggestion thread on a design. To retrieve a reply to a
   * comment thread, use the
   * [Get reply](https://www.canva.dev/docs/connect/api-reference/comments/get-reply/)
   * API. For information on comments and how they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @example
   * ```ts
   * const comment = await client.designs.comments.retrieve(
   *   'KeAbiEAjZEj',
   *   { designId: 'designId' },
   * );
   * ```
   */
  retrieve(
    threadID: string,
    params: CommentRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<CommentRetrieveResponse> {
    const { designId } = params;
    return this._client.get(path`/v1/designs/${designId}/comments/${threadID}`, options);
  }
}

/**
 * A discussion thread on a design.
 *
 * The `type` of the thread can be found in the `thread_type` object, along with
 * additional type-specific properties. The `author` of the thread might be missing
 * if that user account no longer exists.
 */
export interface Thread {
  /**
   * The ID of the thread.
   *
   * You can use this ID to create replies to the thread using the
   * [Create reply API](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/).
   */
  id: string;

  /**
   * When the thread was created, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  created_at: number;

  /**
   * The ID of the design that the discussion thread is on.
   */
  design_id: string;

  /**
   * The type of the discussion thread, along with additional type-specific
   * properties.
   */
  thread_type: Thread.CommentThreadType | Thread.SuggestionThreadType;

  /**
   * When the thread was last updated, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  updated_at: number;

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  author?: CommentsAPI.User;
}

export namespace Thread {
  /**
   * A comment thread.
   */
  export interface CommentThreadType {
    /**
     * The content of a comment thread or reply.
     */
    content: RepliesAPI.CommentContent;

    /**
     * The Canva users mentioned in the comment thread or reply.
     */
    mentions: { [key: string]: CommentThreadType.Mentions };

    type: 'comment';

    /**
     * Metadata for the user, consisting of the User ID and display name.
     */
    assignee?: CommentsAPI.User;

    /**
     * Metadata for the user, consisting of the User ID and display name.
     */
    resolver?: CommentsAPI.User;
  }

  export namespace CommentThreadType {
    /**
     * Information about the user mentioned in a comment thread or reply. Each user
     * mention is keyed using the user's user ID and team ID separated by a colon
     * (`user_id:team_id`).
     */
    export interface Mentions {
      /**
       * The mention tag for the user mentioned in the comment thread or reply content.
       * This has the format of the user's user ID and team ID separated by a colon
       * (`user_id:team_id`).
       */
      tag: string;

      /**
       * Metadata for the user, consisting of the User ID, Team ID, and display name.
       */
      user: Mentions.User;
    }

    export namespace Mentions {
      /**
       * Metadata for the user, consisting of the User ID, Team ID, and display name.
       */
      export interface User {
        /**
         * The name of the user as shown in the Canva UI.
         */
        display_name?: string;

        /**
         * The ID of the user's Canva Team.
         */
        team_id?: string;

        /**
         * The ID of the user.
         */
        user_id?: string;
      }
    }
  }

  /**
   * A suggestion thread.
   */
  export interface SuggestionThreadType {
    /**
     * The current status of the suggestion.
     *
     * - `open` - A suggestion was made, but it hasn't been accepted or rejected yet.
     * - `accepted` - A suggestion was accepted and applied to the design.
     * - `rejected` - A suggestion was rejected and not applied to the design.
     */
    status: 'open' | 'accepted' | 'rejected';

    suggested_edits: Array<
      | SuggestionThreadType.AddSuggestedEdit
      | SuggestionThreadType.DeleteSuggestedEdit
      | SuggestionThreadType.FormatSuggestedEdit
    >;

    type: 'suggestion';
  }

  export namespace SuggestionThreadType {
    /**
     * A suggestion to add some text.
     */
    export interface AddSuggestedEdit {
      text: string;

      type: 'add';
    }

    /**
     * A suggestion to delete some text.
     */
    export interface DeleteSuggestedEdit {
      text: string;

      type: 'delete';
    }

    /**
     * A suggestion to format some text.
     */
    export interface FormatSuggestedEdit {
      /**
       * The suggested format change.
       */
      format:
        | 'font_family'
        | 'font_size'
        | 'font_weight'
        | 'font_style'
        | 'color'
        | 'background_color'
        | 'decoration'
        | 'strikethrough'
        | 'link'
        | 'letter_spacing'
        | 'line_height'
        | 'direction'
        | 'text_align'
        | 'list_marker'
        | 'list_level'
        | 'margin_inline_start'
        | 'text_indent'
        | 'font_size_modifier'
        | 'vertical_align';

      type: 'format';
    }
  }
}

export interface CommentCreateResponse {
  /**
   * A discussion thread on a design.
   *
   * The `type` of the thread can be found in the `thread_type` object, along with
   * additional type-specific properties. The `author` of the thread might be missing
   * if that user account no longer exists.
   */
  thread: Thread;
}

/**
 * Successful response from a `getThread` request.
 *
 * The `comment` property is deprecated. For details of a comment thread, please
 * use the `thread` property.
 */
export interface CommentRetrieveResponse {
  /**
   * @deprecated The comment object, which contains metadata about the comment.
   * Deprecated in favor of the new `thread` object.
   */
  comment?: CommentsAPI.ParentComment | CommentsAPI.ReplyComment;

  /**
   * A discussion thread on a design.
   *
   * The `type` of the thread can be found in the `thread_type` object, along with
   * additional type-specific properties. The `author` of the thread might be missing
   * if that user account no longer exists.
   */
  thread?: Thread;
}

export interface CommentCreateParams {
  /**
   * The comment message in plaintext. This is the comment body shown in the Canva
   * UI.
   *
   * You can also mention users in your message by specifying their User ID and Team
   * ID using the format `[user_id:team_id]`. If the `assignee_id` parameter is
   * specified, you must mention the assignee in the message.
   */
  message_plaintext: string;

  /**
   * Lets you assign the comment to a Canva user using their User ID. You _must_
   * mention the assigned user in the `message`.
   */
  assignee_id?: string;
}

export interface CommentRetrieveParams {
  /**
   * The design ID.
   */
  designId: string;
}

Comments.Replies = Replies;

export declare namespace Comments {
  export {
    type Thread as Thread,
    type CommentCreateResponse as CommentCreateResponse,
    type CommentRetrieveResponse as CommentRetrieveResponse,
    type CommentCreateParams as CommentCreateParams,
    type CommentRetrieveParams as CommentRetrieveParams,
  };

  export {
    Replies as Replies,
    type CommentContent as CommentContent,
    type Reply as Reply,
    type ReplyCreateResponse as ReplyCreateResponse,
    type ReplyRetrieveResponse as ReplyRetrieveResponse,
    type ReplyListResponse as ReplyListResponse,
    type ReplyCreateParams as ReplyCreateParams,
    type ReplyRetrieveParams as ReplyRetrieveParams,
    type ReplyListParams as ReplyListParams,
  };
}

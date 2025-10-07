// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CommentsAPI from '../../comments';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Replies extends APIResource {
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
   * Creates a reply to a comment or suggestion thread on a design. To reply to an
   * existing thread, you must provide the ID of the thread which is returned when a
   * thread is created, or from the `thread_id` value of an existing reply in the
   * thread. Each thread can have a maximum of 100 replies created for it.
   *
   * For information on comments and how they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @example
   * ```ts
   * const reply = await client.designs.comments.replies.create(
   *   'KeAbiEAjZEj',
   *   { designId: 'designId', message_plaintext: 'Thanks!' },
   * );
   * ```
   */
  create(
    threadID: string,
    params: ReplyCreateParams,
    options?: RequestOptions,
  ): APIPromise<ReplyCreateResponse> {
    const { designId, ...body } = params;
    return this._client.post(path`/v1/designs/${designId}/comments/${threadID}/replies`, {
      body,
      ...options,
    });
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
   * Gets a reply to a comment or suggestion thread on a design. For information on
   * comments and how they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @example
   * ```ts
   * const reply =
   *   await client.designs.comments.replies.retrieve(
   *     'KeAZEAjijEb',
   *     { designId: 'designId', threadId: 'KeAbiEAjZEj' },
   *   );
   * ```
   */
  retrieve(
    replyID: string,
    params: ReplyRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ReplyRetrieveResponse> {
    const { designId, threadId } = params;
    return this._client.get(path`/v1/designs/${designId}/comments/${threadId}/replies/${replyID}`, options);
  }

  /**
   * <Warning>
   * This API is currently provided as a preview. Be aware of the following:
   * - There might be unannounced breaking changes.
   * - Any breaking changes to preview APIs won't produce a new [API version](https://www.canva.dev/docs/connect/versions/).
   * - Public integrations that use preview APIs will not pass the review process, and can't be made available to all Canva users.
   * </Warning>
   *
   * Retrieves a list of replies for a comment or suggestion thread on a design.
   *
   * For information on comments and how they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @example
   * ```ts
   * const replies = await client.designs.comments.replies.list(
   *   'KeAbiEAjZEj',
   *   { designId: 'designId' },
   * );
   * ```
   */
  list(threadID: string, params: ReplyListParams, options?: RequestOptions): APIPromise<ReplyListResponse> {
    const { designId, ...query } = params;
    return this._client.get(path`/v1/designs/${designId}/comments/${threadID}/replies`, {
      query,
      ...options,
    });
  }
}

/**
 * The content of a comment thread or reply.
 */
export interface CommentContent {
  /**
   * The content in plaintext. Any user mention tags are shown in the format
   * `[user_id:team_id]`.
   */
  plaintext: string;

  /**
   * The content in markdown. Any user mention tags are shown in the format
   * `[user_id:team_id]`
   */
  markdown?: string;
}

/**
 * A reply to a thread.
 *
 * The `author` of the reply might be missing if that user account no longer
 * exists.
 */
export interface Reply {
  /**
   * The ID of the reply.
   */
  id: string;

  /**
   * The content of a comment thread or reply.
   */
  content: CommentContent;

  /**
   * When the reply was created, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  created_at: number;

  /**
   * The ID of the design that the thread for this reply is attached to.
   */
  design_id: string;

  /**
   * The Canva users mentioned in the comment thread or reply.
   */
  mentions: { [key: string]: Reply.Mentions };

  /**
   * The ID of the thread this reply is in.
   */
  thread_id: string;

  /**
   * When the reply was last updated, as a Unix timestamp (in seconds since the Unix
   * Epoch).
   */
  updated_at: number;

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  author?: CommentsAPI.User;
}

export namespace Reply {
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

export interface ReplyCreateResponse {
  /**
   * A reply to a thread.
   *
   * The `author` of the reply might be missing if that user account no longer
   * exists.
   */
  reply: Reply;
}

/**
 * Successful response from a `getReply` request.
 */
export interface ReplyRetrieveResponse {
  /**
   * A reply to a thread.
   *
   * The `author` of the reply might be missing if that user account no longer
   * exists.
   */
  reply: Reply;
}

/**
 * Successful response from a `listReplies` request.
 */
export interface ReplyListResponse {
  items: Array<Reply>;

  /**
   * If the success response contains a continuation token, the list contains more
   * items you can list. You can use this token as a query parameter and retrieve
   * more items from the list, for example `?continuation={continuation}`.
   *
   * To retrieve all items, you might need to make multiple requests.
   */
  continuation?: string;
}

export interface ReplyCreateParams {
  /**
   * Path param: The design ID.
   */
  designId: string;

  /**
   * Body param: The comment message of the reply in plaintext. This is the reply
   * comment shown in the Canva UI.
   *
   * You can also mention users in your message by specifying their User ID and Team
   * ID using the format `[user_id:team_id]`.
   */
  message_plaintext: string;
}

export interface ReplyRetrieveParams {
  /**
   * The design ID.
   */
  designId: string;

  /**
   * The ID of the thread.
   */
  threadId: string;
}

export interface ReplyListParams {
  /**
   * Path param: The design ID.
   */
  designId: string;

  /**
   * Query param: If the success response contains a continuation token, the list
   * contains more items you can list. You can use this token as a query parameter
   * and retrieve more items from the list, for example
   * `?continuation={continuation}`.
   *
   * To retrieve all items, you might need to make multiple requests.
   */
  continuation?: string;

  /**
   * Query param: The number of replies to return.
   */
  limit?: number;
}

export declare namespace Replies {
  export {
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

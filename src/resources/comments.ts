// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Comments extends APIResource {
  /**
   * <Warning>
   *
   * This API is deprecated, so you should use the
   * [Create reply](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/)
   * API instead.
   *
   * </Warning>
   *
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
   * Creates a reply to a comment in a design. To reply to an existing thread of
   * comments, you can use either the `id` of the parent (original) comment, or the
   * `thread_id` of a comment in the thread. Each comment can have a maximum of 100
   * replies created for it.
   *
   * For information on comments and how they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/).
   *
   * @deprecated
   */
  createReply(
    commentID: string,
    body: CommentCreateReplyParams,
    options?: RequestOptions,
  ): APIPromise<CommentCreateReplyResponse> {
    return this._client.post(path`/v1/comments/${commentID}/replies`, { body, ...options });
  }

  /**
   * <Warning>
   *
   * This API is deprecated, so you should use the
   * [Create thread](https://www.canva.dev/docs/connect/api-reference/comments/create-thread/)
   * API instead.
   *
   * </Warning>
   *
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
   * Create a new top-level comment on a design. For information on comments and how
   * they're used in the Canva UI, see the
   * [Canva Help Center](https://www.canva.com/help/comments/). A design can have a
   * maximum of 1000 comments.
   *
   * @deprecated
   */
  createThread(
    body: CommentCreateThreadParams,
    options?: RequestOptions,
  ): APIPromise<CommentCreateThreadResponse> {
    return this._client.post('/v1/comments', { body, ...options });
  }
}

/**
 * @deprecated If the comment is attached to a Canva Design.
 */
export interface CommentObject {
  /**
   * The ID of the design this comment is attached to.
   */
  design_id: string;

  type: 'design';
}

/**
 * If the comment is attached to a Canva Design.
 */
export interface CommentObjectInput {
  /**
   * The ID of the design you want to attach this comment to.
   */
  design_id: string;

  type: 'design';
}

/**
 * @deprecated Data about the comment, including the message, author, and the
 * object (such as a design) the comment is attached to.
 */
export interface ParentComment {
  /**
   * The ID of the comment.
   *
   * You can use this ID to create replies to the comment using the
   * [Create reply API](https://www.canva.dev/docs/connect/api-reference/comments/create-reply/).
   */
  id: string;

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  author: User;

  /**
   * @deprecated The Canva users mentioned in the comment.
   */
  mentions: { [key: string]: Shared.TeamUser };

  /**
   * The comment message. This is the comment body shown in the Canva UI. User
   * mentions are shown here in the format `[user_id:team_id]`.
   */
  message: string;

  type: 'parent';

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  assignee?: User;

  /**
   * @deprecated If the comment is attached to a Canva Design.
   */
  attached_to?: CommentObject;

  /**
   * When the comment or reply was created, as a Unix timestamp (in seconds since the
   * Unix Epoch).
   */
  created_at?: number;

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  resolver?: User;

  /**
   * When the comment or reply was last updated, as a Unix timestamp (in seconds
   * since the Unix Epoch).
   */
  updated_at?: number;
}

/**
 * @deprecated Data about the reply comment, including the message, author, and the
 * object (such as a design) the comment is attached to.
 */
export interface ReplyComment {
  /**
   * The ID of the comment.
   */
  id: string;

  /**
   * Metadata for the user, consisting of the User ID and display name.
   */
  author: User;

  /**
   * @deprecated The Canva users mentioned in the comment.
   */
  mentions: { [key: string]: Shared.TeamUser };

  /**
   * The comment message. This is the comment body shown in the Canva UI. User
   * mentions are shown here in the format `[user_id:team_id]`.
   */
  message: string;

  /**
   * The ID of the comment thread this reply is in. This ID is the same as the `id`
   * of the parent comment.
   */
  thread_id: string;

  type: 'reply';

  /**
   * @deprecated If the comment is attached to a Canva Design.
   */
  attached_to?: CommentObject;

  /**
   * When the comment or reply was created, as a Unix timestamp (in seconds since the
   * Unix Epoch).
   */
  created_at?: number;

  /**
   * When the comment or reply was last updated, as a Unix timestamp (in seconds
   * since the Unix Epoch).
   */
  updated_at?: number;
}

/**
 * Metadata for the user, consisting of the User ID and display name.
 */
export interface User {
  /**
   * The ID of the user.
   */
  id: string;

  /**
   * The name of the user as shown in the Canva UI.
   */
  display_name?: string;
}

export interface CommentCreateReplyResponse {
  /**
   * @deprecated Data about the reply comment, including the message, author, and the
   * object (such as a design) the comment is attached to.
   */
  comment: ReplyComment;
}

export interface CommentCreateThreadResponse {
  /**
   * @deprecated Data about the comment, including the message, author, and the
   * object (such as a design) the comment is attached to.
   */
  comment: ParentComment;
}

export interface CommentCreateReplyParams {
  /**
   * If the comment is attached to a Canva Design.
   */
  attached_to: CommentObjectInput;

  /**
   * The reply comment message. This is the reply comment body shown in the Canva UI.
   *
   * You can also mention users in your message by specifying their User ID and Team
   * ID using the format `[user_id:team_id]`.
   */
  message: string;
}

export interface CommentCreateThreadParams {
  /**
   * If the comment is attached to a Canva Design.
   */
  attached_to: CommentObjectInput;

  /**
   * The comment message. This is the comment body shown in the Canva UI.
   *
   * You can also mention users in your message by specifying their User ID and Team
   * ID using the format `[user_id:team_id]`. If the `assignee_id` parameter is
   * specified, you must mention the assignee in the message.
   */
  message: string;

  /**
   * Lets you assign the comment to a Canva user using their User ID. You _must_
   * mention the assigned user in the `message`.
   */
  assignee_id?: string;
}

export declare namespace Comments {
  export {
    type CommentObject as CommentObject,
    type CommentObjectInput as CommentObjectInput,
    type ParentComment as ParentComment,
    type ReplyComment as ReplyComment,
    type User as User,
    type CommentCreateReplyResponse as CommentCreateReplyResponse,
    type CommentCreateThreadResponse as CommentCreateThreadResponse,
    type CommentCreateReplyParams as CommentCreateReplyParams,
    type CommentCreateThreadParams as CommentCreateThreadParams,
  };
}

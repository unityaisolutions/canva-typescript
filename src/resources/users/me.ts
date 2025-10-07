// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Me extends APIResource {
  /**
   * Returns the User ID and Team ID of the user account associated with the provided
   * access token.
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/v1/users/me', options);
  }

  /**
   * Lists the API capabilities for the user account associated with the provided
   * access token. For more information, see
   * [Capabilities](https://www.canva.dev/docs/connect/capabilities/).
   */
  listCapabilities(options?: RequestOptions): APIPromise<MeListCapabilitiesResponse> {
    return this._client.get('/v1/users/me/capabilities', options);
  }

  /**
   * Currently, this returns the display name of the user account associated with the
   * provided access token. More user information is expected to be included in the
   * future.
   */
  retrieveProfile(options?: RequestOptions): APIPromise<MeRetrieveProfileResponse> {
    return this._client.get('/v1/users/me/profile', options);
  }
}

/**
 * Metadata for the user, consisting of the User ID and Team ID.
 */
export interface TeamUserSummary {
  /**
   * The ID of the user's Canva Team.
   */
  team_id: string;

  /**
   * The ID of the user.
   */
  user_id: string;
}

export interface MeRetrieveResponse {
  /**
   * Metadata for the user, consisting of the User ID and Team ID.
   */
  team_user: TeamUserSummary;
}

export interface MeListCapabilitiesResponse {
  capabilities?: Array<'autofill' | 'brand_template' | 'resize'>;
}

export interface MeRetrieveProfileResponse {
  /**
   * Profile for the user, consisting of the display name and other attributes.
   */
  profile: MeRetrieveProfileResponse.Profile;
}

export namespace MeRetrieveProfileResponse {
  /**
   * Profile for the user, consisting of the display name and other attributes.
   */
  export interface Profile {
    /**
     * The name of the user as shown in the Canva UI.
     */
    display_name?: string;
  }
}

export declare namespace Me {
  export {
    type TeamUserSummary as TeamUserSummary,
    type MeRetrieveResponse as MeRetrieveResponse,
    type MeListCapabilitiesResponse as MeListCapabilitiesResponse,
    type MeRetrieveProfileResponse as MeRetrieveProfileResponse,
  };
}

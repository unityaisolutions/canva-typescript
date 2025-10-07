// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MeAPI from './me';
import {
  Me,
  MeListCapabilitiesResponse,
  MeRetrieveProfileResponse,
  MeRetrieveResponse,
  TeamUserSummary,
} from './me';

export class Users extends APIResource {
  me: MeAPI.Me = new MeAPI.Me(this._client);
}

Users.Me = Me;

export declare namespace Users {
  export {
    Me as Me,
    type TeamUserSummary as TeamUserSummary,
    type MeRetrieveResponse as MeRetrieveResponse,
    type MeListCapabilitiesResponse as MeListCapabilitiesResponse,
    type MeRetrieveProfileResponse as MeRetrieveProfileResponse,
  };
}

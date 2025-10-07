// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class OAuth extends APIResource {
  /**
   * This endpoint implements the OAuth 2.0 `token` endpoint, as part of the
   * Authorization Code flow with Proof Key for Code Exchange (PKCE). For more
   * information, see
   * [Authentication](https://www.canva.dev/docs/connect/authentication/).
   *
   * To generate an access token, you must provide one of the following:
   *
   * - An authorization code
   * - A refresh token
   *
   * Generating a token using either an authorization code or a refresh token allows
   * your integration to act on behalf of a user. You must first
   * [obtain user authorization and get an authorization code](https://www.canva.dev/docs/connect/authentication/#obtain-user-authorization).
   *
   * Access tokens may be up to 4 KB in size, and are only valid for a specified
   * period of time. The expiry time (currently 4 hours) is shown in the endpoint
   * response and is subject to change.
   *
   * **Endpoint authentication**
   *
   * Requests to this endpoint require authentication with your client ID and client
   * secret, using _one_ of the following methods:
   *
   * - **Basic access authentication** (Recommended): For
   *   [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication),
   *   the `{credentials}` string must be a Base64 encoded value of
   *   `{client id}:{client secret}`.
   * - **Body parameters**: Provide your integration's credentials using the
   *   `client_id` and `client_secret` body parameters.
   *
   * This endpoint can't be called from a user's web-browser client because it uses
   * client authentication with client secrets. Requests must come from your
   * integration's backend, otherwise they'll be blocked by Canva's
   * [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
   * policy.
   *
   * **Generate an access token using an authorization code**
   *
   * To generate an access token with an authorization code, you must:
   *
   * - Set `grant_type` to `authorization_code`.
   * - Provide the `code_verifier` value that you generated when creating the user
   *   authorization URL.
   * - Provide the authorization code you received after the user authorized the
   *   integration.
   *
   * **Generate an access token using a refresh token**
   *
   * Using the `refresh_token` value from a previous user token request, you can get
   * a new access token with the same or smaller scope as the previous one, but with
   * a refreshed expiry time. You will also receive a new refresh token that you can
   * use to refresh the access token again.
   *
   * To refresh an existing access token, you must:
   *
   * - Set `grant_type` to `refresh_token`.
   * - Provide the `refresh_token` from a previous token request.
   *
   * @example
   * ```ts
   * const response = await client.oauth.createToken({
   *   code: 'kp8nnroja7qnx00.opyc1p76rcbyflsxbycjqfp3ub8vzsvltpzwafy9q5l45dn5fxzhe7i7a6mg1i2t8jpsa6sebdeumkzzhicskabgevrxsssec4dvjwfvhq4gs3ugghguar0voiqpfb7axsapiojoter8v3w2s5s3st84jpv2l06h667iw241xngy9c8=vu1tnjp7sz',
   *   code_verifier:
   *     'i541qdcfkb4htnork0w92lnu43en99ls5a48ittv6udqgiflqon8vusojojakbq4',
   *   grant_type: 'authorization_code',
   * });
   * ```
   */
  createToken(body: OAuthCreateTokenParams, options?: RequestOptions): APIPromise<OAuthCreateTokenResponse> {
    return this._client.post('/v1/oauth/token', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * Introspect an access token to see whether it is valid and active. You can also
   * verify some token properties, such as its claims, scopes, and validity times.
   *
   * Requests to this endpoint require authentication with your client ID and client
   * secret, using _one_ of the following methods:
   *
   * - **Basic access authentication** (Recommended): For
   *   [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication),
   *   the `{credentials}` string must be a Base64 encoded value of
   *   `{client id}:{client secret}`.
   * - **Body parameters**: Provide your integration's credentials using the
   *   `client_id` and `client_secret` body parameters.
   *
   * This endpoint can't be called from a user's web-browser client because it uses
   * client authentication with client secrets. Requests must come from your
   * integration's backend, otherwise they'll be blocked by Canva's
   * [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
   * policy.
   *
   * @example
   * ```ts
   * const response = await client.oauth.introspectToken({
   *   token:
   *     'JagALLazU0i2ld9WW4zTO4kaG0lkvP8Y5sSO206ZwxNF4E1y3xKJKF7TzN17BXTfaNOeY0P88AeRCE6cRF7SJzvf3Sx97rA80sGHtFplFo',
   * });
   * ```
   */
  introspectToken(
    body: OAuthIntrospectTokenParams,
    options?: RequestOptions,
  ): APIPromise<OAuthIntrospectTokenResponse> {
    return this._client.post('/v1/oauth/introspect', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * Revoke an access token or a refresh token.
   *
   * If you revoke a _refresh token_, be aware that:
   *
   * - The refresh token's lineage is also revoked. This means that access tokens
   *   created from that refresh token are also revoked.
   * - The user's consent for your integration is also revoked. This means that the
   *   user must go through the OAuth process again to use your integration.
   *
   * Requests to this endpoint require authentication with your client ID and client
   * secret, using _one_ of the following methods:
   *
   * - **Basic access authentication** (Recommended): For
   *   [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication),
   *   the `{credentials}` string must be a Base64 encoded value of
   *   `{client id}:{client secret}`.
   * - **Body parameters**: Provide your integration's credentials using the
   *   `client_id` and `client_secret` body parameters.
   *
   * This endpoint can't be called from a user's web-browser client because it uses
   * client authentication with client secrets. Requests must come from your
   * integration's backend, otherwise they'll be blocked by Canva's
   * [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
   * policy.
   *
   * @example
   * ```ts
   * const response = await client.oauth.revokeToken({
   *   token:
   *     'agALLazU0i2ld9WW4zTO4kaG0lkvP8Y5sSO206ZwxNF4E1y3xKJKF7TzN17BXTfaNOeY0P88AeRCE6cRF7SJzvf3Sx97rA80sGHtFplFo',
   * });
   * ```
   */
  revokeToken(body: OAuthRevokeTokenParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/oauth/revoke', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }
}

/**
 * Exchange auth token to access token.
 */
export interface OAuthCreateTokenResponse {
  /**
   * The bearer access token to use to authenticate to Canva Connect API endpoints.
   * If requested using a `authorization_code` or `refresh_token`, this allows you to
   * act on behalf of a user.
   */
  access_token: string;

  /**
   * The expiry time (in seconds) for the token.
   */
  expires_in: number;

  /**
   * The token that you can use to refresh the access token.
   */
  refresh_token: string;

  /**
   * The token type returned. This is always `Bearer`.
   */
  token_type: string;

  /**
   * The [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) that the token
   * has been granted.
   */
  scope?: string;
}

/**
 * Introspection result of access or refresh tokens
 */
export interface OAuthIntrospectTokenResponse {
  /**
   * Whether the access token is active.
   *
   * If `true`, the access token is valid and active. If `false`, the access token is
   * invalid.
   */
  active: boolean;

  /**
   * The ID of the client that requested the token.
   */
  client?: string;

  /**
   * The expiration time of the token, as a
   * [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.
   */
  exp?: number;

  /**
   * When the token was issued, as a
   * [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.
   */
  iat?: number;

  /**
   * A unique ID for the access token.
   */
  jti?: string;

  /**
   * The "not before" time of the token, which specifies the time before which the
   * access token most not be accepted, as a
   * [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) in seconds.
   */
  nbf?: number;

  /**
   * The [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) that the token
   * has been granted.
   */
  scope?: string;

  /**
   * The subject of the claim. This is the ID of the Canva user that the access token
   * acts on behalf of.
   *
   * This is an obfuscated value, so a single user has a unique ID for each
   * integration. If the same user authorizes another integration, their ID in that
   * other integration is different.
   */
  sub?: string;
}

/**
 * The response on a successful token revocation.
 */
export type OAuthRevokeTokenResponse = unknown;

export type OAuthCreateTokenParams =
  | OAuthCreateTokenParams.ExchangeAuthCodeRequest
  | OAuthCreateTokenParams.ExchangeRefreshTokenRequest;

export declare namespace OAuthCreateTokenParams {
  export interface ExchangeAuthCodeRequest {
    /**
     * The authorization code you received after the user authorized the integration.
     */
    code: string;

    /**
     * The `code_verifier` value that you generated when creating the user
     * authorization URL.
     */
    code_verifier: string;

    /**
     * For exchanging an authorization code for an access token.
     */
    grant_type: 'authorization_code';

    /**
     * Your integration's unique ID, for authenticating the request.
     *
     * NOTE: We recommend that you use basic access authentication instead of
     * specifying `client_id` and `client_secret` as body parameters.
     */
    client_id?: string;

    /**
     * Your integration's client secret, for authenticating the request. Begins with
     * `cnvca`.
     *
     * NOTE: We recommend that you use basic access authentication instead of
     * specifying `client_id` and `client_secret` as body parameters.
     */
    client_secret?: string;

    /**
     * Only required if a redirect URL was supplied when you
     * [created the user authorization URL](https://www.canva.dev/docs/connect/authentication/#create-the-authorization-url).
     *
     * Must be one of those already specified by the client. If not supplied, the first
     * redirect_uri defined for the client will be used by default.
     */
    redirect_uri?: string;
  }

  export interface ExchangeRefreshTokenRequest {
    /**
     * For generating an access token using a refresh token.
     */
    grant_type: 'refresh_token';

    /**
     * The refresh token to be exchanged. You can copy this value from the successful
     * response received when generating an access token.
     */
    refresh_token: string;

    /**
     * Your integration's unique ID, for authenticating the request.
     *
     * NOTE: We recommend that you use basic access authentication instead of
     * specifying `client_id` and `client_secret` as body parameters.
     */
    client_id?: string;

    /**
     * Your integration's client secret, for authenticating the request. Begins with
     * `cnvca`.
     *
     * NOTE: We recommend that you use basic access authentication instead of
     * specifying `client_id` and `client_secret` as body parameters.
     */
    client_secret?: string;

    /**
     * Optional scope value when refreshing an access token. Separate multiple
     * [scopes](https://www.canva.dev/docs/connect/appendix/scopes/) with a single
     * space between each scope.
     *
     * The requested scope cannot include any permissions not already granted, so this
     * parameter allows you to limit the scope when refreshing a token. If omitted, the
     * scope for the token remains unchanged.
     */
    scope?: string;
  }
}

export interface OAuthIntrospectTokenParams {
  /**
   * The token to introspect.
   */
  token: string;

  /**
   * Your integration's unique ID, for authenticating the request.
   *
   * NOTE: We recommend that you use basic access authentication instead of
   * specifying `client_id` and `client_secret` as body parameters.
   */
  client_id?: string;

  /**
   * Your integration's client secret, for authenticating the request. Begins with
   * `cnvca`.
   *
   * NOTE: We recommend that you use basic access authentication instead of
   * specifying `client_id` and `client_secret` as body parameters.
   */
  client_secret?: string;
}

export interface OAuthRevokeTokenParams {
  /**
   * The token to revoke.
   */
  token: string;

  /**
   * Your integration's unique ID, for authenticating the request.
   *
   * NOTE: We recommend that you use basic access authentication instead of
   * specifying `client_id` and `client_secret` as body parameters.
   */
  client_id?: string;

  /**
   * Your integration's client secret, for authenticating the request. Begins with
   * `cnvca`.
   *
   * NOTE: We recommend that you use basic access authentication instead of
   * specifying `client_id` and `client_secret` as body parameters.
   */
  client_secret?: string;
}

export declare namespace OAuth {
  export {
    type OAuthCreateTokenResponse as OAuthCreateTokenResponse,
    type OAuthIntrospectTokenResponse as OAuthIntrospectTokenResponse,
    type OAuthRevokeTokenResponse as OAuthRevokeTokenResponse,
    type OAuthCreateTokenParams as OAuthCreateTokenParams,
    type OAuthIntrospectTokenParams as OAuthIntrospectTokenParams,
    type OAuthRevokeTokenParams as OAuthRevokeTokenParams,
  };
}

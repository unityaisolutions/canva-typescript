// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Connect extends APIResource {
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
   * The Keys API (`connect/keys`) is a security measure you can use to verify the
   * authenticity of webhooks you receive from Canva Connect. The Keys API returns a
   * [JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517#section-2), which
   * you can use to decrypt the webhook signature and verify it came from Canva and
   * not a potentially malicious actor. This helps to protect your systems from
   * [Replay attacks](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/).
   *
   * The keys returned by the Keys API can rotate. We recommend you cache the keys
   * you receive from this API where possible, and only access this API when you
   * receive a webhook signed with an unrecognized key. This allows you to verify
   * webhooks quicker than accessing this API every time you receive a webhook.
   */
  retrieveKeys(options?: RequestOptions): APIPromise<ConnectRetrieveKeysResponse> {
    return this._client.get('/v1/connect/keys', options);
  }
}

export interface ConnectRetrieveKeysResponse {
  /**
   * A Json Web Key Set (JWKS) with public keys used for signing webhooks. You can
   * use this JWKS to verify that a webhook was sent from Canva.
   */
  keys: Array<ConnectRetrieveKeysResponse.Key>;
}

export namespace ConnectRetrieveKeysResponse {
  /**
   * A JSON Web Key Set (JWKS) using the Edwards-curve Digital Signature Algorithm
   * (EdDSA), as described in
   * [RFC-8037](https://www.rfc-editor.org/rfc/rfc8037.html#appendix-A).
   */
  export interface Key {
    /**
     * The `crv` (curve) property identifies the curve used for elliptical curve
     * encryptions. Only "Ed25519" is supported. For more information on the `crv`
     * property, see
     * [RFC-8037 — Key Type "OKP"](https://www.rfc-editor.org/rfc/rfc8037.html#section-2).
     */
    crv: string;

    /**
     * The `kid` (key ID) is a unique identifier for a public key. When the keys used
     * to sign webhooks are rotated, you can use this ID to select the correct key
     * within a JWK Set during the key rollover. The `kid` value is case-sensitive.
     */
    kid: string;

    /**
     * The `kty` (key type) identifies the cryptographic algorithm family used with the
     * key, such as "RSA" or "EC". Only Octet Key Pairs (`OKPs`) are supported. The
     * `kty` value is case-sensitive. For more information on the `kty` property and
     * OKPs, see
     * [RFC-8037 — "kty" (Key Type) Parameter](https://www.rfc-editor.org/rfc/rfc8037.html#section-2).
     */
    kty: string;

    /**
     * The `x` property is the public key of an elliptical curve encryption. The key is
     * Base64urlUInt-encoded. For more information on the `x` property, see
     * [RFC-8037 — "x" (X Coordinate) Parameter](https://www.rfc-editor.org/rfc/rfc8037#section-2).
     */
    x: string;
  }
}

export declare namespace Connect {
  export { type ConnectRetrieveKeysResponse as ConnectRetrieveKeysResponse };
}

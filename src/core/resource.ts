// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Canva } from '../client';

export abstract class APIResource {
  protected _client: Canva;

  constructor(client: Canva) {
    this._client = client;
  }
}

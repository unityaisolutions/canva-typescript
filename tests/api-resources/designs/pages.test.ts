// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource pages', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.designs.pages.retrieve('designId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.designs.pages.retrieve(
        'designId',
        { limit: 1, offset: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Canva.NotFoundError);
  });
});

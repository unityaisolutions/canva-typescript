// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva, { toFile } from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource assetUploads', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.assetUploads.create(
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { 'Asset-Upload-Metadata': {} },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.assetUploads.create(
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { 'Asset-Upload-Metadata': {} },
    );
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.assetUploads.retrieve('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

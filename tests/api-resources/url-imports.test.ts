// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource urlImports', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.urlImports.create({ title: 'My Awesome Design', url: 'x' });
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
    const response = await client.urlImports.create({
      title: 'My Awesome Design',
      url: 'x',
      mime_type: 'application/vnd.apple.keynote',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.urlImports.retrieve('f81b26fd-a33d-4c2d-9e8c-4a7aca798b17');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

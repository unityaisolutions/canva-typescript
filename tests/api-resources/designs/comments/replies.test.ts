// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource replies', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.designs.comments.replies.create('KeAbiEAjZEj', {
      designId: 'designId',
      message_plaintext: 'Thanks!',
    });
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
    const response = await client.designs.comments.replies.create('KeAbiEAjZEj', {
      designId: 'designId',
      message_plaintext: 'Thanks!',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.designs.comments.replies.retrieve('KeAZEAjijEb', {
      designId: 'designId',
      threadId: 'KeAbiEAjZEj',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.designs.comments.replies.retrieve('KeAZEAjijEb', {
      designId: 'designId',
      threadId: 'KeAbiEAjZEj',
    });
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.designs.comments.replies.list('KeAbiEAjZEj', { designId: 'designId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.designs.comments.replies.list('KeAbiEAjZEj', {
      designId: 'designId',
      continuation: 'continuation',
      limit: 1,
    });
  });
});

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource comments', () => {
  // Prism tests are disabled
  test.skip('createReply: only required params', async () => {
    const responsePromise = client.comments.createReply('KeAZEAjijEb', {
      attached_to: { design_id: 'DAFVztcvd9z', type: 'design' },
      message: 'Thanks!',
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
  test.skip('createReply: required and optional params', async () => {
    const response = await client.comments.createReply('KeAZEAjijEb', {
      attached_to: { design_id: 'DAFVztcvd9z', type: 'design' },
      message: 'Thanks!',
    });
  });

  // Prism tests are disabled
  test.skip('createThread: only required params', async () => {
    const responsePromise = client.comments.createThread({
      attached_to: { design_id: 'DAFVztcvd9z', type: 'design' },
      message: 'Great work [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!',
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
  test.skip('createThread: required and optional params', async () => {
    const response = await client.comments.createThread({
      attached_to: { design_id: 'DAFVztcvd9z', type: 'design' },
      message: 'Great work [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!',
      assignee_id: 'oUnPjZ2k2yuhftbWF7873o',
    });
  });
});

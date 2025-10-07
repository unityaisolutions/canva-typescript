// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Canva from 'canva';

const client = new Canva({
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource autofills', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.autofills.create({
      brand_template_id: 'DAFVztcvd9z',
      data: {
        cute_pet_image_of_the_day: { asset_id: 'Msd59349ff', type: 'image' },
        cute_pet_witty_pet_says: { text: 'It was like this when I got here!', type: 'text' },
        cute_pet_sales_chart: {
          chart_data: {
            rows: [
              { cells: [{ type: 'string' }, { type: 'string' }, { type: 'string' }, { type: 'string' }] },
              { cells: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'date' }] },
              { cells: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'date' }] },
            ],
          },
          type: 'chart',
        },
      },
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
    const response = await client.autofills.create({
      brand_template_id: 'DAFVztcvd9z',
      data: {
        cute_pet_image_of_the_day: { asset_id: 'Msd59349ff', type: 'image' },
        cute_pet_witty_pet_says: { text: 'It was like this when I got here!', type: 'text' },
        cute_pet_sales_chart: {
          chart_data: {
            rows: [
              {
                cells: [
                  { type: 'string', value: 'Geographic Region' },
                  { type: 'string', value: 'Sales (millions AUD)' },
                  { type: 'string', value: 'Target met?' },
                  { type: 'string', value: 'Date met' },
                ],
              },
              {
                cells: [
                  { type: 'string', value: 'Asia Pacific' },
                  { type: 'number', value: 10.2 },
                  { type: 'boolean', value: true },
                  { type: 'date', value: 1721944387 },
                ],
              },
              {
                cells: [
                  { type: 'string', value: 'EMEA' },
                  { type: 'number', value: 13.8 },
                  { type: 'boolean', value: false },
                  { type: 'date', value: 0 },
                ],
              },
            ],
          },
          type: 'chart',
        },
      },
      title: 'x',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.autofills.retrieve('jobId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

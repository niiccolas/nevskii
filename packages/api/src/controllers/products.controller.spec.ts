import supertest from 'supertest';
import { app } from '../app';
import client from '../database/client.redis';
import '../helpers/tests';

const request = supertest(app);

// Close Redis client to prevent Jest's "Open Handles" leaks warning
afterEach(() => {
  client.quit(error => {
    if (error) console.log(error);
  });
});

describe('GET /products', () => {
  it('returns a JSON object with a 200 status', async () => {
    const response = await request.get('/v1/products');

    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.status).toBe(200);
  });

  it('returns expected default keys and value types', async () => {
    const response = await request.get('/v1/products');

    expect(response.body).toMatchObject({
      page: expect.any(Number),
      pagesTotal: expect.any(Number),
      itemsPerPage: expect.any(Number),
      itemsTotal: expect.any(Number),
      items: expect.arrayContaining([
        expect.objectContaining({
          idProduct: expect.any(Number),
          title: expect.any(String),
          titleOriginal: expect.any(String),
          price: expect.any(String),
          synopsis: expect.any(String),
          productionYear: expect.any(Number),
          createdAt: expect.any(String),
          ean: expect.any(String),
          imageUrl: expect.any(String),
          authors: { idProductAuthors: expect.any(Number) },
          mediaType: {
            idMediaType: expect.any(Number),
            name: expect.any(String),
          },
          availability: {
            idAvailability: expect.any(Number),
            name: expect.any(String),
          },
        }),
      ]),
    });
  });

  it('accepts a "size" query parameter, to limit the number of items per response aka page', async () => {
    const response = await request.get('/v1/products').query({
      size: '2',
    });

    expect(response.body.items).toHaveLength(2);
  });

  it('accepts a "page" query parameter', async () => {
    const PAGE_NUMBER = 2;
    const {
      body: { items: responsePageOneItems },
    } = await request.get('/v1/products');
    const responsePageTwo = await request.get('/v1/products').query({
      page: PAGE_NUMBER.toString(),
    });

    expect(responsePageTwo.body.page).toBe(PAGE_NUMBER);
    expect(responsePageTwo.body.items).not.toEqual(responsePageOneItems);
  });

  it('accepts an "order" and "orderBy" query parameter to get sorted responses', async () => {
    // ASCENDING PRICE ORDER
    const responseAscending = await request.get('/v1/products').query({
      size: '50',
      order: 'asc',
      orderBy: 'price',
    });
    responseAscending.body.items.reduce(
      (
        { price: previousPrice }: { price: string },
        { price: currentPrice }: { price: string },
      ) => {
        expect(parseInt(previousPrice)).toBeLessThanOrEqual(
          parseInt(currentPrice),
        );
        return { price: currentPrice };
      },
    );

    // DESCENDING PRICE ORDER
    const responseDescending = await request.get('/v1/products').query({
      size: '50',
      order: 'desc',
      orderBy: 'price',
    });
    responseDescending.body.items.reduce(
      (
        { price: previousPrice }: { price: string },
        { price: currentPrice }: { price: string },
      ) => {
        expect(parseInt(previousPrice)).toBeGreaterThanOrEqual(
          parseInt(currentPrice),
        );
        return { price: currentPrice };
      },
    );
  });
});

describe('GET /product/:id', () => {
  const OBJECT_ID = 10;

  it('returns a JSON object with a 200 status', async () => {
    const response = await request.get(`/v1/products/${OBJECT_ID}`);

    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.status).toBe(200);
  });

  it('returns expected default keys and value types', async () => {
    const response = await request.get(`/v1/products/${OBJECT_ID}`);

    expect(response.body).toMatchObject({
      title: expect.any(String),
      titleOriginal: expect.any(String),
      price: expect.any(String),
      synopsis: expect.any(String),
      productionYear: expect.any(Number),
      createdAt: expect.any(String),
      ean: expect.any(String),
      imageUrl: expect.any(String),
      availability: expect.any(String),
      stockStatus: expect.any(String),
      publisher: expect.any(String),
      distributor: expect.any(String),
      ageRating: expect.any(String),
      mediaType: expect.any(String),
      countries: expect.any(String),
      authors: expect.any(String),
      bonusContent: expect.any(String),
      minutes: expect.any(Number),
      dvdZone: expect.any(String),
      category: expect.any(String),
      formatTv: expect.any(String),
      formatFilm: expect.any(String),
      actors: expect.any(String),
      audioTracks: expect.any(String),
      subcategories: expect.any(String),
      genres: expect.any(String),
      subtitles: expect.toBeNullOrType('string'),
      collections: expect.toBeNullOrType('string'),
    });
  });
});

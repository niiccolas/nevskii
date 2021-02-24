import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../entities/Products';
import Orders from '../entities/Orders';

export const getOrders = async (
  req: Request,
  res: Response,
): Promise<Response> => {};

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const DEFAULT_ITEMS_PER_PAGE = 10;
    const DEFAULT_PAGE = 1;

    const {
      title: titleQuery,
      size: sizeQuery,
      page: pageQuery,
      order: orderQuery,
      orderBy: orderByQuery,
    } = req.query;

    let query = getRepository(Products)
      .createQueryBuilder('p')
      .leftJoinAndMapOne('p.authors', 'p.productAuthors', 'pau')
      .leftJoinAndMapOne('p.mediaType', 'p.idMediaType', 'mt')
      .leftJoinAndMapOne('p.availability', 'p.idAvailability', 'pav');

    if (titleQuery)
      query = query
        .where('p.title ILIKE :title', { title: '%' + titleQuery + '%' })
        .orWhere('p.titleOriginal ILIKE :title', {
          title: '%' + titleQuery + '%',
        });

    if (orderByQuery) {
      // Default to ascending sort order
      const order = `${orderQuery}`.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

      query.orderBy(`p.${orderByQuery}`, order);
    }

    const takeItems: number = sizeQuery
      ? Number(sizeQuery)
      : DEFAULT_ITEMS_PER_PAGE;

    const skipItems: number =
      pageQuery && Number(pageQuery) > 1
        ? (Number(pageQuery) - 1) * takeItems
        : 0;
    query.take(takeItems);
    query.skip(skipItems);

    const [products, productsCount] = await query.getManyAndCount();
    // console.log({ xxx });

    // const products = await query.getMany();
    // const productsCount = await getRepository(Products).count();

    return res.json({
      page: Number(pageQuery) || DEFAULT_PAGE,
      pagesTotal: Math.ceil(
        productsCount / (takeItems || DEFAULT_ITEMS_PER_PAGE),
      ),
      itemsPerPage: takeItems || DEFAULT_ITEMS_PER_PAGE,
      itemsTotal: productsCount,
      items: products,
    });
  } catch (error) {
    return res.json(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const product = await getRepository(Products).query(
      `SELECT products.title,
    products.title_original "titleOriginal",
    products.price,
    products.synopsis,
    products.production_year "productionYear",
    products.created_at "createdAt",
    products.ean,
    products.image_url "imageUrl",
    availabilities.name "availability",
    stock_statuses.name "stockStatus",
    publishers.name "publisher",
    distributors.name "distributor",
    age_ratings.name "ageRating",
    media_types.name "mediaType",
    STRING_AGG(DISTINCT countries.name, ';') "countries",
    STRING_AGG(DISTINCT authors.name, ';') "authors",
    videos.bonus_content "bonusContent",
    videos.minutes "minutes",
    video_zones.name "dvdZone",
    video_categories.name "category",
    tv_formats.name "formatTv",
    film_formats.name "formatFilm",
    STRING_AGG(DISTINCT actors.name, ';') "actors",
    STRING_AGG(DISTINCT audio_tracks.name, ';') "audioTracks",
    STRING_AGG(DISTINCT subcategories.name, ';') "subcategories",
    STRING_AGG(DISTINCT genres.name, ';') "genres",
    STRING_AGG(DISTINCT subtitles.name, ';') "subtitles",
    STRING_AGG(DISTINCT collections.name, ';') "collections"
  FROM products
    LEFT JOIN publishers ON publishers.id_publisher = products.id_publisher
    LEFT JOIN availabilities ON availabilities.id_availability = products.id_availability
    LEFT JOIN distributors ON distributors.id_distributor = products.id_distributor
    JOIN age_ratings ON age_ratings.id_age_rating = products.id_age_rating
    LEFT JOIN stock_statuses ON stock_statuses.id_stock_status = products.id_stock_status
    LEFT JOIN media_types ON media_types.id_media_type = products.id_media_type
    LEFT JOIN product_countries ON product_countries.id_pco_product = products.id_product
    LEFT JOIN countries ON countries.id_country = product_countries.id_pco_country
    LEFT JOIN product_authors ON products.id_product = product_authors.id_pau_product
    LEFT JOIN authors ON authors.id_author = product_authors.id_pau_author
    LEFT JOIN videos ON videos.id_video = products.id_video
    LEFT JOIN video_zones ON video_zones.id_video_zone = videos.id_zone
    LEFT JOIN video_categories ON video_categories.id_video_category = videos.id_category
    LEFT JOIN film_formats ON film_formats.id_film_format = videos.id_film_format
    LEFT JOIN tv_formats ON tv_formats.id_tv_format = videos.id_tv_format
    LEFT JOIN video_actors ON video_actors.id_vac_video = videos.id_video
    LEFT JOIN actors ON video_actors.id_vac_actor = actors.id_actor
    LEFT JOIN video_audio ON video_audio.id_vau_video = videos.id_video
    LEFT JOIN audio_tracks ON audio_tracks.id_audio_track = video_audio.id_vau_audio_track
    LEFT JOIN video_subcategories ON video_subcategories.id_vsc_video = videos.id_video
    LEFT JOIN subcategories ON subcategories.id_subcategory = video_subcategories.id_vsc_subcategory
    LEFT JOIN video_genres ON video_genres.id_vge_video = videos.id_video
    LEFT JOIN genres ON genres.id_genre = video_genres.id_vge_genre
    LEFT JOIN video_subtitles ON video_subtitles.id_vst_video = videos.id_video
    LEFT JOIN subtitles ON subtitles.id_subtitle = video_subtitles.id_vst_subtitle
    LEFT JOIN video_collections ON video_collections.id_vco_video = videos.id_video
    LEFT JOIN collections ON collections.id_collection = video_collections.id_vco_collection
  WHERE products.id_product = $1
  GROUP BY products.title,
    products.title_original,
    products.price,
    products.synopsis,
    products.production_year,
    products.created_at,
    products.ean,
    products.image_url,
    availabilities.name,
    stock_statuses.name,
    age_ratings.name,
    media_types.name,
    publishers.name,
    distributors.name,
    videos.minutes,
    film_formats.name,
    video_zones.name,
    video_categories.name,
    tv_formats.name,
    videos.id_video;`,
      [req.params.id],
    );

    return res.json(product[0] || {});
  } catch (error) {
    return res.json(error);
  }
};

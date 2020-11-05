import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../entities/Products';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const DEFAULT_TAKE = 10;
    const DEFAULT_SKIP = 1;
    const { title, size, media, page, order } = req.query;

    let query = getRepository(Products)
      .createQueryBuilder('p')
      // .leftJoinAndMapOne('p.mediaType', 'p.idMediaType', 'mt')
      // .leftJoinAndMapOne('p.availability', 'p.idAvailability', 'av')
      // .leftJoinAndMapOne('p.authors', 'p.productAuthors', 'pau')
      .take(size ? Number(size) : DEFAULT_TAKE)
      .skip(
        page && Number(page) > 1
          ? (Number(page) - 1) * (Number(size) || DEFAULT_TAKE)
          : DEFAULT_SKIP,
      );

    if (order && typeof order === 'string') {
      let sort: string;
      const sortOrder: 'ASC' | 'DESC' | undefined =
        order[0] === 'A' ? 'ASC' : 'DESC';

      switch (order.slice(1)) {
        case 'year':
          sort = 'p.productionYear';
          break;
        case 'price':
          sort = 'p.price';
          break;
        case 'title':
          sort = 'p.title';
          break;
        default:
          sort = 'p.productionYear';
          break;
      }

      query = query.orderBy(sort, sortOrder);
    }

    if (title)
      query = query
        .where('p.title ILIKE :title', { title: '%' + title + '%' })
        .orWhere('p.titleOriginal ILIKE :title', { title: '%' + title + '%' });

    if (media)
      query = query.andWhere('mt.idMediaType = :media', { media: media });

    const [users, count] = await query.getManyAndCount();
    return res.json({ itemsCount: count, items: users });
  } catch (error) {
    return res.json(error);
  }
};

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../entities/Products';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const DEFAULT_ITEMS_PER_PAGE = 10;
    const DEFAULT_PAGE = 0; // DML initializes first productId to 0
    enum OrderBy {
      price = 'price',
      title = 'title',
      createdAt = 'createdAt',
    }

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

    if (orderQuery && orderByQuery) {
      const order =
        orderQuery && `${orderQuery}`.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
      const orderBy = (<any>OrderBy)[`${req.query.orderBy}`]
        ? orderByQuery
        : OrderBy.createdAt;
      query.orderBy(`p.${orderBy}`, order);
    }

    const takeItems: number = sizeQuery
      ? Number(sizeQuery)
      : DEFAULT_ITEMS_PER_PAGE;
    const skipItems: number =
      pageQuery && Number(pageQuery) > 1
        ? (Number(pageQuery) - 1) * takeItems
        : DEFAULT_PAGE;
    query.take(takeItems).skip(skipItems);

    const [products, count] = await query.getManyAndCount();
    return res.json({
      page: Number(pageQuery) || DEFAULT_PAGE,
      itemsPerPage: takeItems || DEFAULT_ITEMS_PER_PAGE,
      itemsTotal: count,
      items: products,
    });
  } catch (error) {
    return res.json(error);
  }
};

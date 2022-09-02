import { GetRegionProductAPIDto } from '../dto/getRegionProducts.dto';
import { Product } from '../entities/product.entity';

export const getParsedProducts = (products: Product[]) => {
  const parsedProducts: GetRegionProductAPIDto[] = products.map((product) => {
    const {
      id,
      name,
      price,
      region,
      salesStatus,
      createdAt,
      thumbnails,
      likedUsers,
      chatRooms,
    } = product;
    return {
      id,
      name,
      price,
      region,
      salesStatus,
      createdAt,
      likedUsers,
      chatRooms,
      thumbnail: thumbnails[0],
    };
  });

  return parsedProducts;
};

import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UseAuthGuard } from 'src/authentication/decorators/use.auth.guard.decorator';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetRegionProductAPIDto } from './dto/getRegionProducts.dto';
import { UpdateProductDto } from './dto/updateProductDto';
import { ProductService } from './product.service';
import { getParsedProducts } from './util';

@Controller('products')
@UseAuthGuard()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('categories')
  async getCategories(@Res() res: Response) {
    const categories = await this.productService.getCategories();
    return res.status(HttpStatus.OK).json(categories);
  }

  @UseAuthGuard()
  @Get('liked')
  async getLikedProducts(@Res() res: Response, @Req() req: Request) {
    const { id: userId } = req['user'];
    const products = await this.productService.getLikedProducts(userId);
    const parsedProducts: GetRegionProductAPIDto[] =
      getParsedProducts(products);
    return res.status(HttpStatus.OK).json(parsedProducts);
  }

  @UseAuthGuard()
  @Get('sale')
  async getSaleProducts(@Res() res: Response, @Req() req: Request) {
    const { id: userId } = req['user'];
    const products = await this.productService.getMySalesProducts(userId);
    const parsedProducts: GetRegionProductAPIDto[] =
      getParsedProducts(products);
    return res.status(HttpStatus.OK).json(parsedProducts);
  }

  @Get(':productId')
  async getProduct(
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const product = await this.productService.getProduct(productId);
    const formattedProduct = this.productService.formatProductForDto(product);
    return res.status(HttpStatus.OK).json(formattedProduct);
  }

  @UseAuthGuard()
  @Get()
  async getPagedProducts(
    @Res() res: Response,
    @Query('regionId') regionId: number,
    @Query('start') startProductId: number,
    @Query('categoryId') categoryId: number,
  ) {
    const LIMIT = 2;
    const { products, nextStartParam } =
      await this.productService.getPagedProducts(
        startProductId,
        regionId,
        categoryId,
        LIMIT,
      );
    return res.status(HttpStatus.OK).json({
      data: products,
      nextStartParam: nextStartParam || null,
    });
  }

  @Delete(':productId')
  async deleteProduct(
    @Req() req: Request,
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const loginUser = req['user'];
    await this.productService.deleteProduct(productId, loginUser.id);
    return res.status(HttpStatus.OK).json({ ok: true });
  }

  @Patch('/like/:productId')
  async toggleLikeState(
    @Req() req: Request,
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const loginUser = req['user'];
    await this.productService.toggleLikeState({
      productId,
      userId: loginUser.id,
    });
    return res.status(HttpStatus.NO_CONTENT).json({ ok: true });
  }

  @Post()
  async createProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const { id: sellerId } = req['user'];
    const newProduct = await this.productService.createNewProduct({
      ...createProductDto,
      sellerId,
    });

    return res.status(HttpStatus.OK).json(newProduct);
  }

  @Patch('/:productId')
  async updateProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { id: sellerId } = req['user'];
    const updatedProduct = await this.productService.updateProductById(
      productId,
      sellerId,
      updateProductDto,
    );
    return res.status(HttpStatus.OK).json(updatedProduct);
  }
}

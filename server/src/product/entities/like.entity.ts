import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @Column({ type: 'int', primary: true })
  productId: number;

  @Column({ type: 'int', primary: true })
  userId: number;

  @ManyToOne(() => Product, (product) => product.likedUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.likedProducts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRegion } from './userRegion.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  address: string;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.region)
  users: UserRegion[];

  @OneToMany(() => Product, (product) => product.region)
  products: Product[];
}

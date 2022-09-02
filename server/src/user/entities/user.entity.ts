import { ChatRoom } from './../../chat/entities/chatRoom.entity';
import { Product } from './../../product/entities/product.entity';
import { OAuthOriginEnum } from 'src/common/enums';
import { UserRegion } from 'src/region/entities/userRegion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Like } from 'src/product/entities/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  name: string;

  @Column({ type: 'enum', enum: OAuthOriginEnum, nullable: false })
  oAuthOrigin: string;

  @Column({ type: 'varchar', nullable: false })
  oAuthId: string;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  regions: UserRegion[];

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => Like, (like) => like.user)
  likedProducts: Like[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.seller)
  chatRoomAsSeller: ChatRoom[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.buyer)
  chatRoomAsBuyer: ChatRoom[];
}

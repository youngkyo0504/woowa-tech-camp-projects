import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './chatMessage.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int', select: false })
  sellerId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column({ type: 'date' })
  sellerLastVisit: Date;

  @Column({ type: 'int', select: false })
  buyerId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @Column({ type: 'date' })
  buyerLastVisit: Date;

  @Column({ type: 'int' })
  leavedUserId: number;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chatRoom, {
    cascade: true,
  })
  messages: ChatMessage[];
}

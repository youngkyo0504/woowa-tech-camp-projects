import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Payment {
  CREDIT = 'credit',
  CASH = 'cash',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', nullable: false, enum: Payment, default: Payment.CASH })
  paymentMethod: Payment;

  @Column({ type: 'decimal', nullable: false })
  paidAmount: number;

  @Column({ type: 'decimal', nullable: false })
  totalAmount: number;

  @CreateDateColumn({})
  paymentDate: Date;

  @Column({ type: 'int', nullable: false })
  orderNumber: number;
}

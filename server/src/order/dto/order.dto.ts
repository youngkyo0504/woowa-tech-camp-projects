import { Payment } from '../entities/order.entity';

export class OrderDto {
  paidAmount: number;
  totalAmount: number;
  paymentMethod: Payment;
  orderItems: {
    menuItemId: number;
    count: number;
  }[];
}

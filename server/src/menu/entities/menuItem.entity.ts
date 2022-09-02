import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';

export enum StatusFormat {
  HOT = 'HOT',
  NEW = 'NEW',
  NORMAL = 'NORMAL',
}

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'json', nullable: false })
  option: { data: { name: string; content: string[] }[] };

  @Column({ nullable: false })
  thumbnail: string;

  @Column({ nullable: false })
  menuId: number;

  @Column({ nullable: false, type: 'enum', enum: StatusFormat, default: StatusFormat.NORMAL })
  status: StatusFormat;

  @ManyToOne((type) => Menu, (menu) => menu.menuItem)
  menu: Menu;
}

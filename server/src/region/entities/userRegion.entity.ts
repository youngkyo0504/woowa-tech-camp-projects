import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Region } from './region.entity';

@Entity()
export class UserRegion {
  @Column({ type: 'int', primary: true })
  regionId: number;

  @Column({ type: 'int', primary: true })
  userId: number;

  @Column({ type: 'boolean' })
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Region, (region) => region.users)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => User, (user) => user.regions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

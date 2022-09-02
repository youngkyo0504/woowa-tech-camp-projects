import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceName } from '@nestjs/typeorm';
import { Store } from 'src/store/entities/store.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [
    // ....
  ],
});

describe('MenuController', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    const store = new Store();
    store.branchName = '성수점';
    store.name = '싸다김밥';
    store.password = '1234';
  });
});

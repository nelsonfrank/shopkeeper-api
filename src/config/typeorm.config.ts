import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '@/users/entities/user.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'shopkeeper',
  entities: [User],
  synchronize: true,
};

export default config;

import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { PropertyType } from 'src/entities/propertyType.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';

dotenv.config()

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'testDB',
  host: 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [User, Property, PropertyFeature, PropertyType],
  synchronize: true,
  // dropSchema: true, //only run env dev
};

export default config;
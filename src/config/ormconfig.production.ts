import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { PropertyType } from 'src/entities/propertyType.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const configProd: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5433,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [User, Property, PropertyFeature, PropertyType],
  synchronize: true,
  // dropSchema: true, //only run env dev
};

export default configProd;
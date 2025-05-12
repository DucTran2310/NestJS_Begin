import { Property } from 'src/entities/property.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const PropertyFactory = setSeederFactory(Property, () => {
  const property = new Property();

  property.name = faker.location.street();
  property.price = +faker.commerce.price({ min: 10000, max: 10000000 });
  property.description = faker.lorem.sentence();

  return property;
});
import { User } from 'src/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.avatarUrl = faker.image.avatar();
  user.password = 'AdStar23102000@'; // Bạn có thể hash nếu muốn.

  return user;
});
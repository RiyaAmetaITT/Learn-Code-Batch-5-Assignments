import { User } from '../models/User';

export class UserRepository {
  save(user: User): void {
    console.log(`Saving ${user.name} to database...`);
  }
}

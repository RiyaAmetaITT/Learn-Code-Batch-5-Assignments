import { User } from '../models/User';

export class UserEmailAndNameValidator {
  validate(user: User): boolean {
    return user.email.includes('@') && user.name.length > 0;
  }
}

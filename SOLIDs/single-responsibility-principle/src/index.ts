import { User } from './models/User';
import { UserEmailAndNameValidator } from './validators/UserValidator';
import { UserRepository } from './repositories/UserRepository';
import { EmailService } from './services/EmailService';

const newUser = new User('Riya Ameta', 'riya@gmail.com');
const userEmailAndNameValidator = new UserEmailAndNameValidator();
const repository = new UserRepository();
const emailService = new EmailService();

if (userEmailAndNameValidator.validate(newUser)) {
  repository.save(newUser);
  emailService.sendWelcomeEmail(newUser);
}

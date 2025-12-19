import { User } from '../models/User';

export class EmailService {
  sendWelcomeEmail(user: User): void {
    console.log(`Sending welcome email to ${user.email}...`);
  }
}

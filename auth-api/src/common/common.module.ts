import { Module } from '@nestjs/common';
import { PasswordService } from './services/password.service';
import { MailService } from './services/mail.service';
@Module({
  providers: [PasswordService, MailService],
  exports: [PasswordService, MailService],
})
export class CommonModule {}

import { Global, Module } from '@nestjs/common';
import { EmailServiceInterfaceType } from '../../port/email-service.interface';
import { SesEmailService } from './ses-email.service';

@Global()
@Module({
  providers: [
    {
      provide: EmailServiceInterfaceType,
      useClass: SesEmailService,
    },
  ],
  exports: [EmailServiceInterfaceType],
})
export class SesModule {}

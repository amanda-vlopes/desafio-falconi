import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, ProfileModule],
})
export class AppModule {}

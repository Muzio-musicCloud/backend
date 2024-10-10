import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, AuthModule, DatabaseModule],
})
export class AppModule {}

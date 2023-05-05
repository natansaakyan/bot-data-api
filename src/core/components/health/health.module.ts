import { Module } from '@nestjs/common';
import { HealthCheckController } from './primary-adapters/controllers/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthModule {}

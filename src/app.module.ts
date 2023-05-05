import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogRequestMiddleware } from './core/shared-kernel/rest/middleware/log-request.middleware';
import { HealthModule } from './core/components/health/health.module';
import config from './core/configuration/config';
import { CandleModule } from './core/components/candle/candle.module';
import { PolygonModule } from './core/shared-kernel/secondary-adapters/polygon/polygon.module';
import { TickerModule } from './core/components/ticker/ticker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
      load: [config],
    }),
    HealthModule,
    PolygonModule,
    CandleModule,
    TickerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}

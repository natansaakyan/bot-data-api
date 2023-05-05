import { Module } from '@nestjs/common';

// Use Cases
import { ListTickersUseCase } from './application/usecase/list-tickers.usecase';

// Controllers
import { TickerController } from './primary-adapters/rest/ticker.controller';

// Repositories
import { TickerRepositoryType } from './application/port/ticker.repository';
import { TickerRepositoryAdapter } from './secondary-adapters/polygon/repository/ticker.repository.adapter';

const useCases = [ListTickersUseCase];

@Module({
  imports: [],
  providers: [
    {
      provide: TickerRepositoryType,
      useClass: TickerRepositoryAdapter,
    },
    ...useCases,
  ],
  controllers: [TickerController],
})
export class TickerModule {}

import { Module } from '@nestjs/common';

// Use Cases
import { ListCandlesUseCase } from './application/usecase/list-candles.usecase';

// Controllers
import { CandleController } from './primary-adapters/rest/candle.controller';
import { CandleRepositoryAdapter } from './secondary-adapters/polygon/repository/candle.repository.adapter';
import { CandleRepositoryType } from './application/port/candle.repository';

const useCases = [ListCandlesUseCase];

@Module({
  imports: [],
  providers: [
    {
      provide: CandleRepositoryType,
      useClass: CandleRepositoryAdapter,
    },
    ...useCases,
  ],
  controllers: [CandleController],
})
export class CandleModule {}

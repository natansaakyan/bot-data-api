import { UseCase } from '../../../../shared-kernel/interface/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { ListTickersRequest } from '../data/dto/request/list-tickers.request';
import { TickerRepository, TickerRepositoryType } from '../port/ticker.repository';
import { Ticker } from '../data/ticker';

@Injectable()
export class ListTickersUseCase implements UseCase<ListTickersRequest, Ticker[]> {
  constructor(
    @Inject(TickerRepositoryType)
    private readonly tickerRepository: TickerRepository,
  ) {}

  public async execute(criteria: ListTickersRequest): Promise<Ticker[]> {
    const results = await this.tickerRepository.getTickers(criteria);

    return results?.length ? results.map(Ticker.fromObject) : [];
  }
}

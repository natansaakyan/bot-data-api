import { Ticker } from '../data/ticker';
import { ListTickersRequest } from '../data/dto/request/list-tickers.request';

export interface TickerRepository {
  getTickers(criteria: ListTickersRequest): Promise<Ticker[] | []>;
}

export const TickerRepositoryType = Symbol.for('TickerRepositoryType');

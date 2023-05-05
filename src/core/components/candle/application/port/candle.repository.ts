import { Candle } from '../data/candle';
import { ListCandlesRequest } from '../data/dto/request/list-candles.request';

export interface CandleRepository {
  getForexData(criteria: ListCandlesRequest): Promise<Candle[] | []>;
}

export const CandleRepositoryType = Symbol.for('CandleRepositoryType');

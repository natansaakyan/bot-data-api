import { Market } from '../data/market.enum';
import { Sort } from '../data/sort.enum';
import { Ticker } from '../../components/ticker/application/data/ticker';
import { CandleEntity } from '../../components/candle/secondary-adapters/polygon/data/candle.entity';

export type ListMarketData = {
  symbol: string;
  interval: number;
  fromDate: Date;
  toDate: Date;
  adjusted?: boolean;
  limit?: number;
};

export type ListTickers = {
  search?: string;
  market?: Market;
  order?: Sort;
};

export interface PolygonServiceInterface {
  getMarketData(params: ListMarketData): Promise<CandleEntity[]>;

  getTicker(params: ListTickers): Promise<Ticker[]>;
}

export const PolygonServiceInterfaceType = Symbol.for('PolygonServiceInterfaceType');

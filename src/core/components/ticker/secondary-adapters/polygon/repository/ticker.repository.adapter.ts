import { Inject, Injectable } from '@nestjs/common';
import { Ticker } from '../../../application/data/ticker';
import { TickerConverter } from '../converters/ticker.converter';
import {
  PolygonServiceInterface,
  PolygonServiceInterfaceType,
} from '../../../../../shared-kernel/port/polygon.interface';
import { TickerRepository } from '../../../application/port/ticker.repository';
import { ListTickersRequest } from '../../../application/data/dto/request/list-tickers.request';

@Injectable()
export class TickerRepositoryAdapter implements TickerRepository {
  private readonly converter = new TickerConverter();

  constructor(
    @Inject(PolygonServiceInterfaceType)
    private polygonService: PolygonServiceInterface,
  ) {}

  public async getTickers(criteria: ListTickersRequest): Promise<Ticker[]> {
    const tickers = await this.polygonService.getTicker({ ...criteria });

    return tickers.length ? tickers.map(this.converter.to) : null;
  }
}
